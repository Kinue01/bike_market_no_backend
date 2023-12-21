import Items from "@/data/items";

class ItemService {

    getItems(){
        return Promise.resolve(Items);
    }

    addItem(item){
        Items.push(item);
        return Promise.resolve(201);
    }

    getItemTypes(){
        return Promise.resolve([{type_id: 1, type_name: "Велосипед"}, {type_id: 2, type_name: "Расходник"}]);
    }
}

export default new ItemService();