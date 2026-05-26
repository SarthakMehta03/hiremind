from fastapi import FastAPI, UploadFile, File

import pdfplumber

app = FastAPI()


@app.post("/parse-resume")
async def parse_resume(

    file: UploadFile = File(...)

):

    text = ""

    # READ PDF
    with pdfplumber.open(
        file.file
    ) as pdf:

        for page in pdf.pages:

            extracted = page.extract_text()

            if extracted:

                text += extracted + "\n"



    # SKILLS DATABASE
    skills_db = [

        "Angular",
        "Node.js",
        "MongoDB",
        "Python",
        "FastAPI",
        "React",
        "Express",
        "JWT"

    ]


    # FOUND SKILLS
    found_skills = []


    # MATCH SKILLS
    for skill in skills_db:

        if skill.lower() in text.lower():

            found_skills.append(skill)



    return {

        "resume_text": text,

        "skills": found_skills

    }