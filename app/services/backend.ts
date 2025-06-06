import {getConfig} from "~/config";

const baseUrl = getConfig().backendUrl;

export async function sendName(name: string): Promise<string | null> {
    try {
        const resp = await fetch(`${baseUrl}/greet`, {
            method: 'POST',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const {message = "Missing!"} = await resp.json();
        return message;
    } catch (err) {
        console.log("sendName error", err);
    }
    return null;
}