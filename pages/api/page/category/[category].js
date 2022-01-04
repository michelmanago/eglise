import { getPageByType } from "@/Model/page";

export default async function handler(req, res) {
    try {
        // 
        if (req.method === 'GET') {
            const category = req.query.category;
            if(!category){
                return res.status(400).json({
                    message: "Vous devez specifiez une category."
                })
            }

            const result = await getPageByType(category);
            return res.json(result)
        }
        else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)

        if(e.status){
            res.status(e.status)
        } else {
            res.status(500)
        }
        
        return res.json({ message: e.message })
    }
}