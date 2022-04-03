import './styles.scss'
import { ToggleButton } from "react-bootstrap";
import { CheckedIcon } from "../../icons";

export default function CheckBox({id, onChange, value}) {
    if(typeof id !== 'string') {
        console.error("Componente CheckBox deve ter um ID");
    }
    return (
        <div className="component-checkbox">
            <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={value}
                value="1"
                label="label"
                onChange={() => onChange(! value)}
            >{CheckedIcon}</ToggleButton>
        </div>
    )
}