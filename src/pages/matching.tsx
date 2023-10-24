import { Layout } from 'components/Layout'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Divider } from 'components/Divider'
import { useState } from 'react'
import { LargeUploadForm } from 'components/FileUploadForm'
import {
  ACTION_FAILED,
  ACTION_SUCCESS,
  CHECK_COMPATIBILITY_FAILED,
  CHECK_COMPATIBILITY_SUCCESS,
  GENERATE_QUESTIONS_FAILED,
  GENERATE_QUESTIONS_SUCCESS,
} from 'constants/messages'
import { OpenAIRequest, getChatCompletions } from 'api'
import { getToken } from 'context/auth'
import { toast } from 'components/Toast'
import {
  OPEN_AI_MODEL,
  checkCompatibilityPrompt,
  generateSetOfQuestionsPrompt,
} from 'constants/GPTPrompt'

const MatchingPage = () => {
  const [isCheckCompatibility, setCheckCompatibility] = useState(false)
  const [isGenerateQuestions, setIsGenerateQuestions] = useState(false)
  const [compatibilityResult, setCompatibilityResult] = useState('')
  const [setOfQuestionResult, setSetOfQuestionResult] = useState('')
  const [jDFile, setJDFile] = useState<File | null>(null)
  const [cVFile, setCVFile] = useState<File | null>(null)

  const getTextContent = (textFile: File) =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsText(textFile)
      reader.onload = () => {
        resolve(reader.result)
      }
    })

  const checkCompatibility = async () => {
    if (!jDFile || !cVFile) {
      return
    }

    try {
      setCheckCompatibility(true)
      const jDContent = (await getTextContent(jDFile)) as string
      const cVContent = (await getTextContent(cVFile)) as string
      const prompt = checkCompatibilityPrompt(jDContent, cVContent)
      const openAIRequest = {
        model: OPEN_AI_MODEL,
        messages: [{ role: 'system', content: prompt }],
      } as OpenAIRequest
      const token = getToken() ?? ''
      const params = { authorization: token }
      const response = await getChatCompletions(openAIRequest, params)
      setCompatibilityResult(response?.choices?.[0].message?.content)
      toast.success({
        title: ACTION_SUCCESS,
        message: CHECK_COMPATIBILITY_SUCCESS,
      })
    } catch (error) {
      toast.error({
        title: ACTION_FAILED,
        message: CHECK_COMPATIBILITY_FAILED,
      })
    } finally {
      setCheckCompatibility(false)
    }
  }

  const generateSetOfQuestions = async () => {
    if (!jDFile || !cVFile) {
      return
    }

    try {
      setIsGenerateQuestions(true)
      const jDContent = (await getTextContent(jDFile)) as string
      const cVContent = (await getTextContent(cVFile)) as string
      const prompt = generateSetOfQuestionsPrompt(jDContent, cVContent)
      const openAIRequest = {
        model: OPEN_AI_MODEL,
        messages: [{ role: 'system', content: prompt }],
      } as OpenAIRequest
      const token = getToken() ?? ''
      const params = { authorization: token }
      const response = await getChatCompletions(openAIRequest, params)
      setSetOfQuestionResult(response?.choices?.[0].message?.content)
      toast.success({
        title: ACTION_SUCCESS,
        message: GENERATE_QUESTIONS_SUCCESS,
      })
    } catch (error) {
      toast.error({
        title: ACTION_FAILED,
        message: GENERATE_QUESTIONS_FAILED,
      })
    } finally {
      setIsGenerateQuestions(false)
    }
  }

  return (
    <Layout>
      <Heading as="h3">Matching</Heading>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1">
          <Text className="text-lg">Job Description</Text>
          <Text className="text-sm text-gray-500">
            Upload a job description to be used to check eligibility.
          </Text>
        </div>
        <div className="col-span-2">
          <LargeUploadForm
            selectedFile={jDFile}
            setFile={setJDFile}
            type="jd"
          />
        </div>
      </div>

      <Divider className="h-0" color="gray-200" />

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1">
          <Text className="text-lg">Candidate's CV</Text>
          <Text className="text-sm text-gray-500">
            Upload the CV of the candidate applying for the above job position.
          </Text>
        </div>
        <div className="col-span-2">
          <LargeUploadForm
            selectedFile={cVFile}
            setFile={setCVFile}
            type="cv"
          />
        </div>
      </div>

      <Divider className="h-0" color="gray-200" />

      <div className="flex justify-between items-center">
        <Button
          appearance="primary"
          className="w-[500px]"
          disabled={isCheckCompatibility}
          loading={isCheckCompatibility}
          type="button"
          onClick={checkCompatibility}
        >
          Check Compatibility (JD and CV)
        </Button>

        <Button
          appearance="primary"
          className="w-[500px]"
          disabled={isGenerateQuestions}
          loading={isGenerateQuestions}
          type="button"
          onClick={generateSetOfQuestions}
        >
          Generate A Set Of Question
        </Button>
      </div>
      <div className="w-full">
        <Text className="text-lg">Check Compatibility Result:</Text>
        <pre className="italic text-sm text-gray-500 whitespace-pre-wrap break-words">
          {compatibilityResult}
        </pre>
      </div>

      <div className="w-full">
        <Text className="text-lg">Generated A Set Of Question Result:</Text>
        <pre className="italic text-sm text-gray-500 whitespace-pre-wrap break-words">
          {setOfQuestionResult}
        </pre>
      </div>
    </Layout>
  )
}

export default MatchingPage
