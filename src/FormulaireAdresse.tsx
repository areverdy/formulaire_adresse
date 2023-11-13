import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDebounce } from 'usehooks-ts'

function FormulaireAdresse(){

    const [saisieVille, setVille]= useState<string>("")
    const [propositions, setPropositions] = useState<string[]>([])
    const rechercheadresse = useDebounce(saisieVille, 1000)

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => { setVille(e.target.value) },
        [saisieVille]
    )

    const handleClickProposition = useCallback((propal: string) => {
        setVille(propal)
    }, [])

    useEffect(() => {
        const getData = async () => {
            console.log('saisie', saisieVille)
            const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + rechercheadresse)
            const data = await response.json()
            const propositions = data.features.map( (adresse: any) => adresse.properties.label) 
            console.log('data', propositions)
            setPropositions(propositions)
        }
        getData()
    }, [rechercheadresse])

    useEffect(() => {
        console.log("effect propales", propositions);
        if(propositions.length > 0 && propositions[0] === saisieVille){
            setPropositions([])
        }
    }, [propositions])

    return (
        <div>
            <div className="formulaire-adresse">
                <input
                    type="text"
                    placeholder="Saisir votre adresse"
                    onChange={handleChange}
                    value={saisieVille}
                />
            </div>
            <div>
                <div>Adresse : {saisieVille}</div>
                <div>
                    {propositions.map( (proposition, key) => (
                        <li key={key} onClick={() => handleClickProposition(proposition)}>
                            {proposition}
                        </li>
                    ))}
                </div>
            </div>

        </div>
        
        )

}

export default FormulaireAdresse
