import { useState } from 'react';


export function useTransactionalState(options) {
    const onAdd = options.onAdd;
    const onRemove = options.onRemove;

    const [state, setState] = useState(options.initialState || []);

    const getDiff = (oldItems, newItems) => {
        const removedItems = oldItems.filter(oldItem => !newItems.find(newItem => newItem === oldItem));
        const addedItems = newItems.filter(newItem => !oldItems.find(oldItem => newItem === oldItem));
        return [removedItems, addedItems];
    };

    const setNewItems = (newItems) => {
        const [removedItems, addedItems] = getDiff(state, newItems);
        removedItems.forEach(removedItem => {
            if (onRemove) onRemove(removedItem);
        });
        addedItems.forEach(addedItem => {
            if (onAdd) onAdd(addedItem);
        });
        setState(newItems);
    };
    return [state, setNewItems];
}
