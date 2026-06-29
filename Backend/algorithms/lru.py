def lru(reference_string, frames_count):
    frames = []
    frame_history = []

    page_faults = 0
    hits = 0

    for page in reference_string:

        if page in frames:
            hits += 1

            frames.remove(page)
            frames.append(page)

        else:
            page_faults += 1

            if len(frames) < frames_count:
                frames.append(page)

            else:
                frames.pop(0)
                frames.append(page)

        frame_history.append(frames.copy())

    hit_ratio = (hits / len(reference_string)) * 100

    return {
        "page_faults": page_faults,
        "hits": hits,
        "hit_ratio": round(hit_ratio, 2),
        "final_frames": frames,
        "frame_history": frame_history
    }