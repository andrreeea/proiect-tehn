import Contact from "./views/Contact";
import Utilizator from "./views/Utilizator";
import UtilizatorEdit from "./views/UtilizatorEdit";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Inscriere from "./views/Inscriere";
import Cerere from "./views/Cerere";
import upload from "./views/upload";

export const routes = Object.freeze([
    {
        path:"/",
        component: Home,
        name: "Home"
    },
    {
        path:"/Inscriere",
        component: Inscriere,
        // name: "Inscriere"
    },
    {
        path:"/upload",
        component: upload,
        // name: "Incarcare cerere"
    },
    
    {
        path:"/Utilizator",
        component: Utilizator,
        name: " Utilizatori"
    },
    {
        path:"/CerereDisertatie",
        component: Cerere,
        // name: "Cereri profesori"
    },
    {
        path:"/Contact",
        component: Contact,
        name: "Contact"
    },
    {
        path:"*",
        component: NotFound,
        name: null
    },
    {
        path:"/NewUtilizator/",
        component: UtilizatorEdit,
        name: null
    },
    {
        path:"/utilizator/:id",
        component: UtilizatorEdit,
        name: null
    }
]);
