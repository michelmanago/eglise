import { useEffect, useState } from "react";
import Image from 'next/image'

import styles from "../styles/input-image.module.css"

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'svg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
}

const InputImage = props => {

    const uploadFile = event => {

        const input = event.target

        if (input.files && input.files[0]) {

            const file = input.files[0]

            if(isImage(file.name)){
                props.onUpload(file, props.image)
            }
        }
        
    }

    return (
        <div className={styles.inputImageInput + " w-full h-full"} >

            <div className={styles.inputImageInputInput}>

                <input 
                    onChange={uploadFile} 
                    className={styles.inputImageInputFile} 
                    type="file"
                    accept="image/*,.pdf"
                    id={props.id ? props.id : "bioImage"}
                />
                <label className={styles.inputImageInputLabel} htmlFor={props.id ? props.id : "bioImage"}>
                    <span>
                        {
                            props.image ? "Modifier l'image" : "Ajouter une image"
                        }
                    </span>
                </label>

            </div>
            
            {
                props.image ? (
                    <Image
                        src={props.image}
                        alt={""}
                        layout="responsive"
                        width={300}
                        height={400}
                        objectFit={"cover"}
                    />
                ) : (
                    <div style={{
                        height: "100%",
                        paddingTop: 400/3 + "%"
                    }}></div>
                )
            }

        </div>
    )

}

export default InputImage