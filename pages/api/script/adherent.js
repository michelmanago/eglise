//import {getSession} from 'next-auth/react';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import {createAdherent} from 'dao/adherent';

export default async function Handler(req, res) {
    /*const session = await getSession({req});
    if (!session) res.status(401).json({message: 'You need to be authenticate to use this api route'});*/

    if (req.method === 'GET') {
        let errorCount = 0;
        let emptyRowCount = 0;
        let csvFile = fs.readFileSync('public/data_export/SGDB_fideles_liste_site_internet.csv', 'utf-8');
        //let csvFile = fs.readFileSync('public/data_export/cesor_19_04_2022/AdherentInactif.csv', 'utf-8');
        const records = parse(csvFile, {
            columns: true,
            skip_empty_lines: true,
        });
        for (const row of records) {
            // console.log({row});
            try {
                let newAdherent = await createAdherent({
                    nom: row.nom,
                    prenom: row['prénom'],
                    email: row['e.mail'],
                    postale: row.postale,
                    news: true,
                });
                console.log({newAdherent});
            } catch (error) {
                errorCount++;
                console.log({error});
            }
        }
        console.log('CSV file successfully processed', {errorCount, emptyRowCount, nbRow: records.length});
        res.status(200).json({message: 'script end'});
    } else {
        res.status(405).json({message: 'Method Not Allowed'});
    }
}
