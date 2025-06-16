import PyPDF2

with open('TheLawHub-Dictionary-Alphabetical.pdf', 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    with open('extracted_dictionary.txt', 'w', encoding='utf-8') as out:
        for page in reader.pages:
            text = page.extract_text()
            if text:
                out.write(text + '\n') 