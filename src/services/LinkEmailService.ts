import { google,outlook } from "calendar-link";

class LinkEmailService{

 gerarLink(data:string){

    const link = {
        linkGoogle :"",
        linkOutlook:""
    };
    let date = new Date(data);
    const event = {
        title: "Horário de Agendamento",
        start: date
    }

        link.linkGoogle =  google(event); 

        link.linkOutlook = outlook(event);

    return link;
}
}

export default new LinkEmailService();
