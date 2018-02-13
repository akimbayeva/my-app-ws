const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// parse application/json
app.use(bodyParser.json());

console.log('Starting web service!');

const fakeTodoItems = [
    {
        id: 215,
        title: 'todo item #2',
        status: 'completed'
    },
    {
        id: 102,
        title: 'todo item #1',
        status: 'active'
    },
    {
        id: 103,
        title: 'todo item #3',
        status: 'active'
    }
];


const handler_todoitems_get = (req, resp)=> {
    console.log("handler_todoitems_get invoked!");

    resp.json(fakeTodoItems);
}

const handler_todoitem_by_id_get = (req, resp)=> {
    console.log("handler_todoitems_get invoked!");
    console.log("req.params.id: "  + req.params.id);
    
    const todoItemToReturn = fakeTodoItems.find( item => item.id == req.params.id);
    resp.json(todoItemToReturn);
}

const handler_todoitem_add = (req, resp)=> {
    console.log("handler_todoitem_add invoked!");
    console.log("req.body");
    console.log(req.body);

    const reduceFunc = (maxId, item) => {
        if (!maxId) {
            return item.id;
        } else {
            return item.id > maxId ? item.id : maxId;
        }
    };
    const nextId = fakeTodoItems.reduce(reduceFunc, 0) + 1;

    const itemToAdd = {
        id: nextId,
        ...req.body
    };

    const nextIndex = fakeTodoItems.length;
    fakeTodoItems[nextIndex] = itemToAdd;

    resp.json(fakeTodoItems[nextIndex]);
}

// Configure rooting rules - what to do when requests come to a particular path and particular HTTP verb
app.get('/todoitems', handler_todoitems_get);
app.get('/todoitems/:id', handler_todoitem_by_id_get);
app.post('/todoitems', handler_todoitem_add);




// Start listening!!!! Before that line is executed, ws is not active!

const functionToBeCalledWhenWSStartsListening = ()=> {
    console.log("functionToBeCalledWhenWSStartsListening invoked!");
}

app.listen(3010, functionToBeCalledWhenWSStartsListening);

