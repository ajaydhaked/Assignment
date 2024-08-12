from header import *

@app.get("/")
def read_root():
    return {"Hello": "World"}

# add question
@app.post("/addquestion")
async def add_question(question: str = Form(...), answer: str = Form(...)):
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO questions (question, answer) VALUES (%s, %s)", (question, answer))
        conn.commit()
        cur.close()
        return {"status": "success"}
    except Error as e:
        return {"status": "error", "message": e}
    
@app.get("/getquestions")
async def get_questions():
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM questions")
        questions = cur.fetchall()
        cur.close()
        return {"status": "success", "questions": questions}
    except Error as e:
        return {"status": "error", "message": e}
    
@app.post("/deletequestion")
async def delete_question(id: int = Form(...)):
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM questions WHERE id = %s", (id,))
        conn.commit()
        cur.close()
        return {"status": "success"}
    except Error as e:
        return {"status": "error", "message": e}
    
@app.post("/updatequestion")
async def update_question(id: int = Form(...), question: str = Form(...), answer: str = Form(...)):
    try:
        cur = conn.cursor()
        cur.execute("UPDATE questions SET question = %s, answer = %s WHERE id = %s", (question, answer, id))
        conn.commit()
        cur.close()
        return {"status": "success"}
    except Error as e:
        return {"status": "error", "message": e}

    
