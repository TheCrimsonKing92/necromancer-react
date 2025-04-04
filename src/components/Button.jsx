export default function Button({ onClick, children, ...rest }) {
    return (
        <button onClick={onClick} style={{ margin: '5px', padding: '10px' }} { ...rest }>
            { children }
        </button>
    )
};