def lru(reference_string, frames_count):
    frames = []
    frame_history = []

    page_faults = 0
    hits = 0

    # LRU tracking
    recent_use = []

    for page in reference_string:

        if page in frames:
            hits += 1

            recent_use.remove(page)
            recent_use.append(page)

        else:
            page_faults += 1

            if len(frames) < frames_count:
                frames.append(page)
            else:
                lru_page = recent_use.pop(0)

                index = frames.index(lru_page)
                frames[index] = page

            recent_use.append(page)

        frame_history.append(frames.copy())

    hit_ratio = (hits / len(reference_string)) * 100
    miss_ratio = (page_faults / len(reference_string)) * 100

    return {
        "page_faults": page_faults,
        "hits": hits,
        "hit_ratio": round(hit_ratio, 2),
        "miss_ratio": round(miss_ratio, 2),
        "final_frames": frames,
        "frame_history": frame_history
    }