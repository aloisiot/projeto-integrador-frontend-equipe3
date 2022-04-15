import { useEffect, useState } from "react";
import Button from "../Button";



export default function ImgInputBox({ remover, updater, linkName, currentEdit, setCurrentEdit }) {
    const [oldLink, setOldLink] = useState("")
    const [newLink, setNewLink] = useState("")


    useEffect(() => [
        setOldLink(linkName)
    ], [linkName])


    return (
        <div key={linkName} className="img-input-box p-3 d-flex redondo mt-2">
            <input disabled={currentEdit !== linkName} className="redondo" placeholder="Insira o link da imagem" defaultValue={linkName} onBlur={(e) => { setNewLink(e.target.value) }}></input>
            <div className="img-input-btn-box gap-1">
                {linkName === currentEdit ? (
                    <Button variant="btn-success" onClick={() => { updater(oldLink, newLink) }}>Confirmar edição</Button> 
                ):(
                    <Button  disabled={linkName === currentEdit} onClick={() => { setCurrentEdit(linkName) }}>Editar imagem</Button>
                )}
                <Button
                    variant="btn-danger" 
                    disabled={linkName === currentEdit} 
                    onClick={() => { remover(linkName) }}
                    >Remover
                </Button>
            </div>
        </div>
    )
}