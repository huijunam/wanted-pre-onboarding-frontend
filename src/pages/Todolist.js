// todolist 페이지
import { useEffect,useState } from "react";

function Todolist () {
    const [newTodo, setNewTodo] =useState(''); // todo list 추가 
    const [todos, setTodos]= useState([]);
    const [editingTodoId, setEditingTodiId] = useState(null); // todo list 수정 id 
    const [editingTodoValue, setEditingTodoValue] = useState(''); // todo list 수정 value
    const [editingTodoisCompleted, setEditingTodoisCompleted] =useState(false); // todo list 수정 isCompleted
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 
    const [jwtToken, setJwtToken]=useState(''); // jwt 토큰 

    useEffect(() => {
        if (localStorage.getItem('jwt') === null) { // 토큰 유효성 검사
            window.location.replace('/signin')
        }else{
            setJwtToken(localStorage.getItem('jwt')); // 토큰 저장 
        } 
        // getTodos api
        fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' +jwtToken,
            }
        })
        .then((response) => response.json())
        .then((data) =>{
            for (let i =0; i<data.length; i++){
                const getTodoItem ={
                    id: data[i].id,
                    todo: data[i].todo,
                    isCompleted: data[i].isCompleted,
                    userId: data[i].userId,
                };
                setTodos((todos) =>[...todos, getTodoItem]);
            }
        })
        .catch((error) =>{
            setErrorMessage('todo 리스트 불러오기에 실패했습니다.');
        })

      },[jwtToken]);

    const handleNewTodoChange =(e) =>{
        setNewTodo(e.target.value);
    };

    const handleAddTodo =() =>{
        if(newTodo.trim() ===''){
            return; // 빈 todo list 리턴 방지
        }

        // createTodo
        fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' +jwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"todo": newTodo}),
        })
        .then((response) => response.json())
        .then((data) =>{
            const newTodoItem ={
                id: data.id,
                todo: data.todo,
                isCompleted: false,
                userId: data.userId,
            };
            setTodos((todos) =>[...todos, newTodoItem]);
        })
        .catch((error) =>{
            setErrorMessage('todo 리스트 추가에 실패했습니다.');
        })
        setNewTodo(''); // 초기화
    };

    const handleDelteTodo =(id) =>{
        // deleteTodo
        fetch('https://www.pre-onboarding-selection-task.shop/todos/'+id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' +jwtToken,
            },
        })
        .catch((error) =>{
            setErrorMessage('todo 리스트 삭제에 실패했습니다.');
        })
        // 화면 리로드 
        window.location.reload();
    }

    const handleModifyTodo =(id, value) =>{
        setEditingTodiId(id)
        setEditingTodoValue(value);
    };

    const handleCancel =()=>{
        setEditingTodiId(null);
        setEditingTodoValue('');
        setEditingTodoisCompleted(false);
        setErrorMessage('');
    }

    const handleSubmit =() =>{
        if(editingTodoValue.trim() ===''){
            setErrorMessage('내용을 입력해주세요.');
            return;
        }
        // updateTodo
        fetch('https://www.pre-onboarding-selection-task.shop/todos/'+editingTodoId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' +jwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "todo": editingTodoValue, "isCompleted": editingTodoisCompleted})
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            const EditTodoItem ={
                id: data.id,
                todo: data.todo,
                isCompleted: data.isCompleted,
                userId: data.userId,
            };
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === data.id ? { ...EditTodoItem } : todo
                )
            );
            // 초기화
            setEditingTodiId(null);
            setEditingTodoValue('');
            setEditingTodoisCompleted(false);
            setErrorMessage('');
        })
        .catch((error) =>{
            setErrorMessage('수정에 실패했습니다.');
        })
    }

    return (
      <div>
        <input 
            data-testid="new-todo-input"
            value= {newTodo}
            onChange= {handleNewTodoChange} />
        <button 
            data-testid="new-todo-add-button"
            onClick={handleAddTodo}> 추가</button>
        
        <ul>
            {todos.map((todo, id) =>{return(
                <li key= {id}>
                    {editingTodoId === todo.id ? (
                        <>
                            <label>
                                <input type="checkbox"
                                    defaultChecked={todo.isCompleted}
                                    onChange={(e) =>setEditingTodoisCompleted(e.target.checked)}
                                />
                            </label>
                            <input data-testid="modify-input"
                                value={editingTodoValue}
                                onChange={(e) =>setEditingTodoValue(e.target.value)} />
                            <button data-testid="submit-button"
                                onClick={handleSubmit}>제출</button>
                            <button data-testid="cancel-button"
                                onClick={handleCancel}>취소</button>
                        </>
                    ):(
                        <>
                        <label>
                            <input type="checkbox" 
                                defaultChecked={todo.isCompleted}
                                onChange={(e) =>setEditingTodoisCompleted(e.target.checked)}
                            />
                            <span>{todo.todo}</span>
                        </label>
                        <button data-testid="modify-button"
                            onClick={() =>handleModifyTodo(todo.id, todo.todo)}>수정</button>
                        <button data-testid="delete-button" 
                            onClick={() => handleDelteTodo(todo.id)}>삭제</button>
                        </>
                    )}
                </li>
            )})}
        </ul>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default Todolist;