def translate_address(
    logical_address: int,
    page_size: int,
    page_table: dict
):
    page_number = logical_address // page_size
    offset = logical_address % page_size

    frame_number = page_table.get(page_number)

    if frame_number is None:
        return None

    physical_address = (
        frame_number * page_size + offset
    )

    return {
        "page_number": page_number,
        "offset": offset,
        "frame_number": frame_number,
        "physical_address": physical_address
    }