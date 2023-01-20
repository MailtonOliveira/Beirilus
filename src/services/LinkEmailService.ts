import { google,outlook } from "calendar-link";

class LinkEmailService{

 gerarLink(data:Date,type:string):string{

    let link = ""
    const event = {
        title: "Horário de Agendamento",
        start: data
    }

    if(type == "google") { link =  google(event) }

    if(type == "outlook") { link = outlook(event) }

    return link;
}
}

export default new LinkEmailService();
