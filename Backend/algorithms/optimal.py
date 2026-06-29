def optimal(reference_string, frames_count):
    frames = []
    frame_history = []

    page_faults = 0
    hits = 0

    for i in range(len(reference_string)):

        page = reference_string[i]

        if page in frames:
            hits += 1

        else:
            page_faults += 1

            if len(frames) < frames_count:
                frames.append(page)

            else:
                future = reference_string[i + 1:]

                replace_index = -1
                farthest_use = -1

                for j in range(len(frames)):

                    # Page never used again
                    if frames[j] not in future:
                        replace_index = j
                        break

                    next_use = future.index(frames[j])

                    if next_use > farthest_use:
                        farthest_use = next_use
                        replace_index = j

                frames[replace_index] = page

        frame_history.append(frames.copy())

    hit_ratio = (hits / len(reference_string)) * 100

    return {
        "page_faults": page_faults,
        "hits": hits,
        "hit_ratio": round(hit_ratio, 2),
        "final_frames": frames,
        "frame_history": frame_history
    }