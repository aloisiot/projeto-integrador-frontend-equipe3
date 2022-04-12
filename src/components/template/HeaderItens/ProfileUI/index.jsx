import useAuth from "../../../../app/auth/useAuth";
import { XIcon } from "../../../icons";
import './style.scss';

export default function ProfileUI({user}) {
    const { signOut } = useAuth()

    return (
        <div className="d-flex gap-2 component-user-header headerItem">
            <div className="first-char d-flex align-items-center justify-content-center">
                {user?.name?.[0]}
            </div>
            <div className="d-flex flex-column ">
                <div className="d-flex justify-content-between align-items-center ">
                    <p >Olá,</p>
                    <span className="x-icon" onClick={() => signOut()}>{XIcon}</span>
                </div>
                <p className="texto-inferior">
                    {`${user?.name} ${user?.lastname}`}
                </p>
            </div>
        </div>
    )
}
