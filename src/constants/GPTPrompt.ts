export const OPEN_AI_MODEL = 'openai/gpt-3.5-turbo'

export const checkCompatibilityPrompt = (
  jDContent: string,
  cVContent: string,
) => `
  I will provide you with 2 contents, 1 job description and 1 is the applicant's CV. You will act as an assistant to a recruiter in the information technology industry, please give me feedback if the candidate's profile matches the job description. The return value is calculated as a percentage that matches the job description. Focus on the language the candidate has used to program, the number of years of experience, and the candidate's desired career direction compared to the career opportunities that the job description offers.

  Use the following response format, keeping the section headings as-is, and provide
  your feedback. Use bullet points for each response. The provided examples are for
  illustration purposes only and should not be repeated.

  **Education (example)**:
  - The candidate has a degree in IT, which matches the requirement of having a degree in IT.

  **Experience (example)**:
  - The candidate has 2 years of experience with ReactJS, which matches the requirement of having 2 years of experience with ReactJS. 

  **Skills (example)**:
  - The candidate is proficient in JavaScript, which matches the requirement of being proficient in JavaScript. 

  **Career aspiration (example)**:
  - The candidate is eager to become a team lead, which matches the opportunity of being able to lead a team of 3-5 developers. 

  **Overall (example)**:
  - The candidate's profile matches the job description and fulfills the necessary requirements.
  - The percentage of matches is 100%.

  Here is my job description: 
  "${jDContent}"
  Here is my job description: 
  "${cVContent}"
`

export const generateSetOfQuestionsPrompt = (
  jDContent: string,
  cVContent: string,
) => `
  I will provide you with 2 contents, 1 job description and 1 is the applicant's CV. You will act as a leader in the information technology industry, please generate a set of questions that matches the job description and the candidate's CV. Focus on the language the candidate has used to program and requirements of the job description, and the number of years of experience (the set of questions must match the level required by JD but still include lower-level questions). The levels are "Fresher, Junior, Middle, Senior". Alternatively must include some questions about teamwork.

  Use the following response format (if the requirement is a junior dev, you can ignore questions for higher levels such as Middle and senior), keeping the section headings as-is. Use bullet points for each response. The provided examples are for illustration purposes only and should not be repeated.

  **Fresher (example)**:
  - Some basic fundamental, definitions of requirement program language

  **Junior (example)**:
  - What task do you do?

  **Middle (example)**:
  - Did you create a base project for the team using to develop?

  **Senior (example)**:
  - Some advanced topics of requirement program language such as optimization, performance,...

  **Teamwork (example)**:
  - How do you resolve conflict with others in your team?

  Here is my job description: 
  "${jDContent}"
  Here is my job description: 
  "${cVContent}"
`

const DefaultMail = `
  Kính gửi bạn: applicant's_name
  Công ty TNHH Công nghệ Phần mềm XXX chân thành cảm ơn bạn đã quan tâm tới vị trí ReactJS Developer. Công ty đánh giá cao hồ sơ năng lực của bạn và trân trọng gửi tới bạn lời mời tham dự buổi phỏng vấn với thông tin chi tiết như sau:
  Thời gian: interview_time,
  Hình thức phỏng vấn: Online qua Video Skype
  Bạn vui lòng phản hồi email để xác nhận tham gia phỏng vấn.
  Mọi thắc mắc vui lòng liên hệ Ms. YYY Tel: 012 345 6789
  Bạn có thể theo dõi các kênh thông tin dưới đây để biết thêm về văn hóa và môi trường công ty:  
  Website: https://tuyendung.xxx.com/  
  Fanpage Tuyển dụng: facebook.com/tuyendungxxx
  Linkedin tuyển dụng: https://www.linkedin.com/in/tuyendungxxx/ 
  Bạn vui lòng liên hệ với bộ phận Tuyển dụng qua địa chỉ email này khi cần sự trợ giúp liên quan đến thông tin việc làm từ XXX Software!
  Thanks & Best regards!
`

export const generateMailPrompt = (candidateInfo: string) => `
  I will provide you with some candidate info (name, email, github link, phone number,...). Please fill them in the mail format below:

  Use the following response format. Use bullet points for each response.

  **Candidate info (example)**:
  - Name: applicant's_name
  - Email: applicant's_email
  - GitHub link: applicant's_github_link
  - Phone number: applicant's_phone

  **Invite main (example)**
  - Kính gửi bạn: ...

  Here is my CV: 
  "${candidateInfo}"

  Here is my email format: 
  "${DefaultMail}"  
`

export const getPersonalInfoPrompt = (cVContent: string) => `
  I will provide you a the candidate's CV. Get the candidate's information (name, email, github link, phone number,...) for me.
  
  Here is my CV: 
  "${cVContent}"
  Here is my email format: 
  "${DefaultMail}"
`
