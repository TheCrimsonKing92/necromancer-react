import React, { useState } from 'react';

const SelectionGroup = props => {
    let [selectedIndex, setSelectedIndex] = useState(null);

    const conditionallySetSelectedId = index => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
        }
    };

    const bindSelected = index => {
        return () => conditionallySetSelectedId(index);
    };

    return (
        React.Children.map(props.children, (child, index) => {
            if (React.isValidElement(child)) {
                const props = {
                    onSelected: bindSelected(index),
                    selected: index === selectedIndex
                };

                return React.cloneElement(child, props);
            }

            return child;
        })
    )
};

export default SelectionGroup;