import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

function FormulaireAdresse(){
    const [saisieVille, setVille]= useState<string>("")

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => { setVille(e.target.value) },
        [saisieVille]
    )

    useEffect(() => {
        const getData = async () => {
            console.log('saisie', saisieVille)
            const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + saisieVille)
            const data = await response.json()
            console.log('data', data.features.map( (adresse: any) => adresse.properties.label))
        }
        getData()
    }, [saisieVille])

    return (
        <div>
            <div className="formulaire-adresse">
                <input
                    type="text"
                    placeholder="Saisir votre adresse"
                    onChange={handleChange}
                />
            </div>
            <div>
                <div>Adresse : {saisieVille}</div>
                {/* <input /> {handleChange}>saisieVille</input></> */}
            </div>

        </div>
        
        )

}

export default FormulaireAdresse
