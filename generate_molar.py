#!/usr/bin/env python3
"""Generate a realistic molar tooth GLB model procedurally."""

import numpy as np
import trimesh
import struct
import json
import os

def create_molar_tooth():
    """Create a detailed molar crown mesh using parametric surfaces."""
    
    # Parameters
    n_theta = 96   # circumferential resolution
    n_phi = 48     # vertical resolution
    
    # Base radius profile (cross-section) - molar shape
    def molar_radius(theta, height_frac):
        """Compute radius at given angle and height fraction."""
        # Base oval shape (slightly wider mesial-distal than buccal-lingual)
        r_base = 0.42 + 0.06 * np.cos(2 * theta)
        
        # Height-dependent scaling
        if height_frac < 0.05:
            # Root/cervical margin - narrower
            scale = 0.6 + height_frac * 6.0
        elif height_frac < 0.15:
            # Cervical constriction
            t = (height_frac - 0.05) / 0.10
            scale = 0.90 + t * 0.10
        elif height_frac < 0.55:
            # Crown body - widest
            t = (height_frac - 0.15) / 0.40
            scale = 1.0 + np.sin(t * np.pi) * 0.08
        elif height_frac < 0.80:
            # Tapering toward occlusal
            t = (height_frac - 0.55) / 0.25
            scale = 1.05 - t * 0.15
        else:
            # Occlusal surface - dome
            t = (height_frac - 0.80) / 0.20
            scale = 0.90 * (1.0 - t * t * 0.85)
        
        # Add anatomical bulge on buccal side
        buccal_bulge = 0.04 * np.exp(-((theta - 0) ** 2) / 0.8) * (1.0 - height_frac)
        # Lingual bulge
        lingual_bulge = 0.03 * np.exp(-((theta - np.pi) ** 2) / 0.8) * (1.0 - height_frac)
        
        return r_base * scale + buccal_bulge + lingual_bulge
    
    # Generate mesh vertices
    vertices = []
    thetas = np.linspace(0, 2 * np.pi, n_theta, endpoint=False)
    phis = np.linspace(0, 1, n_phi)
    
    total_height = 1.0
    
    for j, h in enumerate(phis):
        for i, theta in enumerate(thetas):
            r = molar_radius(theta, h)
            
            # Add subtle noise for organic feel
            noise = 0.005 * np.sin(theta * 7 + h * 5) + 0.003 * np.cos(theta * 11 + h * 8)
            r += noise
            
            x = r * np.cos(theta)
            z = r * np.sin(theta)
            y = h * total_height
            
            vertices.append([x, y, z])
    
    # Top cap (occlusal surface with cusps)
    # Add center point
    center_idx = len(vertices)
    vertices.append([0, total_height * 0.92, 0])
    
    # Add cusp points
    cusp_positions = [
        # (angle, radial_offset, height_boost, size) — 5 cusps for a molar
        (0.3, 0.18, 0.10, 0.12),      # Mesiobuccal
        (-0.3, 0.20, 0.08, 0.10),     # Distobuccal  
        (np.pi + 0.4, 0.16, 0.12, 0.11),  # Mesiolingual
        (np.pi - 0.3, 0.18, 0.09, 0.10),  # Distolingual
        (np.pi * 0.5, 0.06, 0.05, 0.08),  # Central ridge
    ]
    
    cusp_meshes = []
    for angle, rad_off, h_boost, size in cusp_positions:
        cx = rad_off * np.cos(angle)
        cz = rad_off * np.sin(angle)
        cy = total_height * 0.90 + h_boost
        
        # Create a cusp as a sphere
        cusp = trimesh.creation.icosphere(subdivisions=3, radius=size)
        cusp.vertices[:, 1] *= 0.55  # flatten
        cusp.apply_translation([cx, cy, cz])
        cusp_meshes.append(cusp)
    
    # Build main crown faces
    faces = []
    for j in range(n_phi - 1):
        for i in range(n_theta):
            i_next = (i + 1) % n_theta
            v0 = j * n_theta + i
            v1 = j * n_theta + i_next
            v2 = (j + 1) * n_theta + i_next
            v3 = (j + 1) * n_theta + i
            faces.append([v0, v1, v2])
            faces.append([v0, v2, v3])
    
    # Top cap faces
    top_ring_start = (n_phi - 1) * n_theta
    for i in range(n_theta):
        i_next = (i + 1) % n_theta
        faces.append([top_ring_start + i, top_ring_start + i_next, center_idx])
    
    # Bottom cap (flat base)
    bottom_center_idx = len(vertices)
    vertices.append([0, 0, 0])
    for i in range(n_theta):
        i_next = (i + 1) % n_theta
        faces.append([i_next, i, bottom_center_idx])
    
    vertices = np.array(vertices)
    faces = np.array(faces)
    
    # Create main mesh
    crown = trimesh.Trimesh(vertices=vertices, faces=faces)
    
    # Merge cusps
    for cusp in cusp_meshes:
        crown = trimesh.util.concatenate([crown, cusp])
    
    # Smooth normals
    crown.fix_normals()
    
    # Create fissure grooves (dark lines between cusps)
    # These are thin indentations — we'll add them as separate small meshes
    groove_meshes = []
    groove_points = [
        # Central fissure (mesial-distal)
        ([0, 0.88, -0.12], [0, 0.88, 0.12]),
        # Buccal-lingual fissure
        ([-0.10, 0.88, 0], [0.10, 0.88, 0]),
    ]
    
    for p1, p2 in groove_points:
        p1 = np.array(p1)
        p2 = np.array(p2)
        mid = (p1 + p2) / 2
        direction = p2 - p1
        length = np.linalg.norm(direction)
        
        groove = trimesh.creation.cylinder(radius=0.012, height=length, sections=12)
        # Align to direction
        groove.apply_translation([0, 0, 0])
        
        # Simple alignment: rotate to match direction
        z_axis = np.array([0, 0, 1])
        d_norm = direction / length
        
        # Use trimesh align
        groove.vertices[:, 1] *= 0.4  # flatten
        groove.apply_translation(mid)
        groove_meshes.append(groove)
    
    return crown, groove_meshes


def create_root():
    """Create tooth roots (2-3 roots for a molar)."""
    roots = []
    
    root_configs = [
        # (x_offset, z_offset, length, top_radius, tip_radius, curve_x, curve_z)
        (-0.12, -0.08, 0.7, 0.10, 0.02, -0.05, -0.02),   # Mesial root
        (0.14, -0.06, 0.65, 0.09, 0.02, 0.04, -0.01),     # Distal root
        (0.0, 0.12, 0.55, 0.08, 0.02, 0.01, 0.03),        # Palatal root
    ]
    
    for x_off, z_off, length, r_top, r_tip, curve_x, curve_z in root_configs:
        n_seg = 24
        n_circ = 24
        verts = []
        faces = []
        
        for j in range(n_seg + 1):
            t = j / n_seg
            r = r_top + (r_tip - r_top) * t ** 0.7
            y = -t * length
            
            # Add curvature
            cx = x_off + curve_x * np.sin(t * np.pi * 0.7)
            cz = z_off + curve_z * np.sin(t * np.pi * 0.7)
            
            for i in range(n_circ):
                theta = 2 * np.pi * i / n_circ
                x = cx + r * np.cos(theta)
                z = cz + r * np.sin(theta)
                verts.append([x, y, z])
        
        # Add tip point
        tip_idx = len(verts)
        verts.append([x_off + curve_x * 0.7, -length - 0.03, z_off + curve_z * 0.7])
        
        for j in range(n_seg):
            for i in range(n_circ):
                i_next = (i + 1) % n_circ
                v0 = j * n_circ + i
                v1 = j * n_circ + i_next
                v2 = (j + 1) * n_circ + i_next
                v3 = (j + 1) * n_circ + i
                faces.append([v0, v1, v2])
                faces.append([v0, v2, v3])
        
        # Tip cap
        last_ring = n_seg * n_circ
        for i in range(n_circ):
            i_next = (i + 1) % n_circ
            faces.append([last_ring + i, last_ring + i_next, tip_idx])
        
        root_mesh = trimesh.Trimesh(vertices=np.array(verts), faces=np.array(faces))
        root_mesh.fix_normals()
        roots.append(root_mesh)
    
    return roots


def export_glb(mesh, filepath):
    """Export mesh as GLB with PBR material."""
    
    # Color the mesh with tooth-like color
    # Cream/ivory for crown
    mesh.visual = trimesh.visual.ColorVisuals(
        mesh=mesh,
        vertex_colors=np.tile([245, 235, 220, 255], (len(mesh.vertices), 1)).astype(np.uint8)
    )
    
    # Export as GLB
    glb_data = mesh.export(file_type='glb')
    
    with open(filepath, 'wb') as f:
        f.write(glb_data)
    
    print(f"Exported {filepath}: {len(mesh.vertices)} vertices, {len(mesh.faces)} faces, {len(glb_data)} bytes")


def main():
    print("Generating molar tooth 3D model...")
    
    # Create crown
    crown, grooves = create_molar_tooth()
    
    # Create roots
    roots = create_root()
    
    # Combine all
    all_meshes = [crown] + roots
    for g in grooves:
        all_meshes.append(g)
    
    combined = trimesh.util.concatenate(all_meshes)
    
    # Scale to reasonable size
    combined.apply_scale(1.5)
    
    # Center
    centroid = combined.centroid
    combined.apply_translation(-centroid)
    
    # Move so the crown is roughly centered vertically
    bounds = combined.bounds
    y_center = (bounds[0][1] + bounds[1][1]) / 2
    combined.apply_translation([0, -y_center, 0])
    
    output_path = '/home/user/webapp/public/static/molar-tooth.glb'
    export_glb(combined, output_path)
    
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")
    print("Done!")


if __name__ == '__main__':
    main()
