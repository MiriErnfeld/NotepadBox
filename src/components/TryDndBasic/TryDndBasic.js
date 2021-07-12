import { useDrag,useDrop } from 'react-dnd';

export default function Box() {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        /* This is optional. The dragPreview will be attached to the dragSource by default */
        <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }
        }>
            {/* The drag ref marks this node as being the "pick-up" node */}
            <div role="Handle" ref={drag} >
            </div></div>
    )
}

export function Bucket() {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        // Props to collect
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <div
            ref={drop}
            role={'Dustbin'}
            style={{ backgroundColor: isOver ? 'red' : 'white' }}
        >
            {canDrop ? 'Release to drop' : 'Drag a box here'}
        </div>
    )
}