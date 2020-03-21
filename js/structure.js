
class User{
    constructor(login, rights) {
        this.login = login;
        this.rights = rights;
    }
}

class Trainer{
    constructor(login, description, icon) {
        this.login = login;
        this.description = description;
        this.icon = icon;
    }
}



class News {
    constructor(title, description, photo) {
        this.title = title;
        this.description = description;
        this.photo = photo;
    }
}

class Style{
    constructor(type, description, icon) {
        this.type = type;
        this.description = description;
        this.icon = icon;
    }
}

class Price{
    constructor(type, description, icon) {
        this.type = type;
        this.description = description;
        this.icon = icon;
    }
}
