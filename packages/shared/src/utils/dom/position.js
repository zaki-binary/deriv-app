const getMaxHeightByAligningBottom = ({ parent_rect, child_height }) =>
    parent_rect.top + parent_rect.height + child_height;

const getMinHeightByAligningTop = ({ parent_rect, child_height }) => parent_rect.top - child_height;

export const getPosition = ({
    preferred_alignment = 'bottom',
    child_el,
    parent_el,
    should_consider_parent_height = true,
}) => {
    const parent_rect = parent_el.getBoundingClientRect();
    const child_height = child_el.clientHeight;
    const body_rect = document.body.getBoundingClientRect();

    const { top, bottom, left, width } = parent_rect;
    const max_height = getMaxHeightByAligningBottom({ parent_rect, child_height });

    const top_placement_style = {
        bottom: body_rect.bottom - (should_consider_parent_height ? top : bottom) + 8, // add 8px extra margin for better UX
        left,
        width,
        transformOrigin: 'bottom',
    };

    const bottom_placement_style = {
        top: should_consider_parent_height ? bottom : top,
        left,
        width,
        transformOrigin: 'top',
    };

    if (preferred_alignment === 'bottom') {
        if (max_height <= body_rect.height) {
            return {
                style: bottom_placement_style,
                placement: 'bottom',
            };
        }
    }

    const min_height = getMinHeightByAligningTop({ parent_rect, child_height });
    if (preferred_alignment === 'top') {
        if (min_height >= 0) {
            return {
                style: top_placement_style,
                placement: 'top',
            };
        }
    }

    if (max_height - body_rect.height < 0 - min_height) {
        return {
            style: bottom_placement_style,
            placement: 'bottom',
        };
    }
    return {
        style: top_placement_style,
        placement: 'top',
    };
};
