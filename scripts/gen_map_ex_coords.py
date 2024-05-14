x_increment = 60.006900228223756
y_increment = 51.9675


"""
In a hexagonal grid, a hexagon can move in 6 directions.
The following matrix represents the movement of a hexagon in the grid.
The first element of the sub-array represents the x-coordinate change, and the second element represents the y-coordinate change.

Note: The y-axis is inverted in the hexagonal grid. The y-axis increases from top to bottom.

The 6 directions are:
1. Right (x+1, y)
2. Bottom Right (x, y+1)
3. Bottom Left (x-1, y+1)
4. Left (x-1, y)
5. Top Left (x, y-1)
6. Top Right (x+1, y-1)
"""

move_matrix = {
    "right": (1, 0), 
    "bottom_right": (0.5, 1),
    "bottom_left": (-1, 1),
    "left": (-1, 0),
    "top_left": (0, -1),
    "top_right": (0.5, -1)
}

def move_hex(x, y, direction):
    """
    This function moves the hexagon in the grid in the given direction.
    """
    dx, dy = move_matrix[direction]
    return x + dx, y + dy


def get_hex_coords(x, y, direction):
    """
    This function returns the x and y coordinates of the hexagon in the grid after moving in the given direction.
    """
    dx, dy = move_matrix[direction]
    return x + dx*x_increment, y + dy*y_increment


def get_hex_coords_n_times(x, y, direction, n):
    """
    This function returns the x and y coordinates of the hexagon in the grid after moving in the given direction n times.
    """
    for i in range(1, n+1):
        x, y = get_hex_coords(x, y, direction)
    return x, y


def straight_path(x, y):
    return get_hex_coords_n_times(x, y, "right", 2)


def step_ur_ur_r(x, y):
    # Move diagonally up-right by 2 hexagons
    _x, _y = get_hex_coords_n_times(x, y, "top_right", 2)
    return get_hex_coords(_x, _y, "right")  # Move right by 1 hexagon


def step_br_br_r(x, y):
    # Move diagonally down-right by 2 hexagons
    _x, _y = get_hex_coords_n_times(x, y, "bottom_right", 2)

    return get_hex_coords(_x, _y, "right")  # Move right by 1 hexagon
    # return _x, _y

def step_r_ur_ur(x, y):
    # Move right by 1 hexagon
    _x, _y = get_hex_coords(x, y, "right")
    # Move diagonally up-right by 2 hexagons
    return get_hex_coords_n_times(_x, _y, "top_right", 2)

def step_r_br_br(x, y):
    # Move right by 1 hexagon
    _x, _y = get_hex_coords(x, y, "right")
    # Move diagonally down-right by 2 hexagons
    return get_hex_coords_n_times(_x, _y, "bottom_right", 2)

def step_ur_r_ur(x, y):
    # Move diagonally up-right by 1 hexagon
    _x, _y = get_hex_coords(x, y, "top_right")
    # Move right by 1 hexagon
    _x, _y = get_hex_coords(_x, _y, "right")
    
    # Move diagonally up-right by 1 hexagon
    return get_hex_coords(_x, _y, "top_right")


def step_br_r_br(x, y):
    # Move diagonally down-right by 1 hexagon
    _x, _y = get_hex_coords(x, y, "bottom_right")
    # Move right by 1 hexagon
    _x, _y = get_hex_coords(_x, _y, "right")
    
    # Move diagonally down-right by 1 hexagon
    return get_hex_coords(_x, _y, "bottom_right")


start_coords = (150.01725057055938, 363.77250000000004)

triage_coords = straight_path(*start_coords)


asc_1_coords = straight_path(*triage_coords)  # Decsion node
other_1_coords = step_br_br_r(*asc_1_coords)  # End of asc_1
_12_lead_CG = step_ur_ur_r(*asc_1_coords)  # 12 Lead ECG

clinical_assessment_1_coords = straight_path(*_12_lead_CG)  

stemi_dec_coords = straight_path(*clinical_assessment_1_coords)  # Decision node
stemi_end_coords = step_ur_ur_r(*stemi_dec_coords)  # End of stemi_dec

troponin_biomarker_1_coords = step_br_br_r(*stemi_dec_coords)

clinical_assessment_2_coords = straight_path(*troponin_biomarker_1_coords)

positive_bio_marker_dec_coords = straight_path(*clinical_assessment_2_coords)  # Decision node

nstemi_1_dec_coords = step_ur_ur_r(*positive_bio_marker_dec_coords)  # Decision node
nstemi_1_end_coords = step_ur_ur_r(*nstemi_1_dec_coords)  # End of nstemi_1_dec

acs_2_dec_coords = step_br_br_r(*positive_bio_marker_dec_coords)  # Decision node
other2_coords = step_br_br_r(*acs_2_dec_coords)  # End of acs_2_dec

# Here the path is rejoined using a blank node
# assert that the coords match

blank_node_coords_1 = step_br_r_br(*nstemi_1_dec_coords)
assert blank_node_coords_1 == step_ur_r_ur(*acs_2_dec_coords)

delay_coords = straight_path(*blank_node_coords_1)
troponin_biomarker_2_coords = straight_path(*delay_coords)
clinical_assessment_3_coords = straight_path(*troponin_biomarker_2_coords)

delta_bio_marker_dec_coords = straight_path(*clinical_assessment_3_coords)  # Decision node

nstemi_2_dec_coords = step_ur_ur_r(*delta_bio_marker_dec_coords)  # Decision node
nstemi_2_end_coords = step_ur_ur_r(*nstemi_2_dec_coords)  # End of nstemi_2_dec

acs_3_dec_coords = step_br_br_r(*delta_bio_marker_dec_coords)  # Decision node
other_3_coords = step_br_br_r(*acs_3_dec_coords)  # End of acs_3_dec

blank_node_coords_2 = step_br_r_br(*nstemi_2_dec_coords)
assert blank_node_coords_2 == step_ur_r_ur(*acs_3_dec_coords)

unstable_angiina_dec_coords = straight_path(*blank_node_coords_2)  # Decision node
unstable_angiina_end_coords = step_ur_ur_r(*unstable_angiina_dec_coords)  # Lead node

other_4_coords = step_br_br_r(*unstable_angiina_dec_coords)  # Lead node

coords = {
    "start": start_coords,
    "triage": triage_coords,
    "ACS_1": asc_1_coords,
    "other_1": other_1_coords,
    "12_lead_CG": _12_lead_CG,
    "clinical_assessment_1": clinical_assessment_1_coords,
    "stemi_dec": stemi_dec_coords,
    "stemi_end": stemi_end_coords,
    "troponin_biomarker_1": troponin_biomarker_1_coords,
    "clinical_assessment_2": clinical_assessment_2_coords,
    "positive_bio_marker_dec": positive_bio_marker_dec_coords,
    "nstemi_1_dec": nstemi_1_dec_coords,
    "nstemi_1_end": nstemi_1_end_coords,
    "acs_2_dec": acs_2_dec_coords,
    "other_2": other2_coords, # End of acs_2_dec
    "blank_node_1": blank_node_coords_1,
    "delay": delay_coords,
    "troponin_biomarker_2": troponin_biomarker_2_coords,
    "clinical_assessment_3": clinical_assessment_3_coords,
    "delta_bio_marker_dec": delta_bio_marker_dec_coords,
    "nstemi_2_dec": nstemi_2_dec_coords,
    "nstemi_2_end": nstemi_2_end_coords,
    "acs_3_dec": acs_3_dec_coords,
    "other_3": other_3_coords, # End of acs_3_dec
    "blank_node_2": blank_node_coords_2,
    "unstable_angina_dec": unstable_angiina_dec_coords,
    "unstable_angina_end": unstable_angiina_end_coords, # Leaf node
    "other_4": other_4_coords, # Leaf node
    
}

for node_name, node_coords in coords.items():
    print(f"{node_name}: {node_coords}")


# Test


# Test for br_r_br
x, y = 420.0483015975663, 311.805

# x: 540.0621020540138, y: 415.74
assert step_br_r_br(x, y) == (540.0621020540138, 415.74)
print("Test passed for step_br_r_br")

