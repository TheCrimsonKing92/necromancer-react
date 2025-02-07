import Button from "../Button";

export default function ChoiceScene({ text, choices, onChoose }) {
    return (
        <div>
            <p>{ text }</p>
            {
                Object.entries(choices).map(([action]) => (
                    <Button key={ action } onClick={ () => onChoose(action) }>
                        { action }
                    </Button>
                ))
            }
        </div>
    );
};