import { Layout } from 'components/Layout'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { Divider } from 'components/Divider'
import { useState } from 'react'
import { LargeUploadForm } from 'components/FileUploadForm'
import { OpenAIRequest, getChatCompletions } from 'api'
import { getToken } from 'context/auth'
import { toast } from 'components/Toast'
import {
  OPEN_AI_MODEL,
  generateMailPrompt,
  getPersonalInfoPrompt,
} from 'constants/GPTPrompt'
import { Button } from 'components/Button'
import {
  ACTION_FAILED,
  ACTION_SUCCESS,
  GENERATE_INVITE_MAIL_FAILED,
  GENERATE_INVITE_MAIL_SUCCESS,
} from 'constants/messages'
import { getTextOfFile } from 'utils/getTextOfFile'

const GenerateInviteMailPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [generateInviteMailResult, setGenerateInviteMailResult] = useState('')
  const [cVFile, setCVFile] = useState<File | null>(null)

  const generateInviteMail = async () => {
    if (!cVFile) {
      return
    }

    try {
      setIsLoading(true)
      const cVTextContent = await getTextOfFile(cVFile)
      const prompt = getPersonalInfoPrompt(cVTextContent)
      let openAIRequest = {
        model: OPEN_AI_MODEL,
        messages: [{ role: 'system', content: prompt }],
      } as OpenAIRequest
      const token = getToken() ?? ''
      const params = { authorization: token }
      const response = await getChatCompletions(openAIRequest, params)
      const candidateInfo = response?.choices?.[0].message?.content

      const promptGenMail = generateMailPrompt(candidateInfo)
      openAIRequest = {
        ...openAIRequest,
        messages: [{ role: 'system', content: promptGenMail }],
      } as OpenAIRequest
      const res = await getChatCompletions(openAIRequest, params)
      const createdMail = res?.choices?.[0].message?.content
      setGenerateInviteMailResult(createdMail)
      toast.success({
        title: ACTION_SUCCESS,
        message: GENERATE_INVITE_MAIL_SUCCESS,
      })
    } catch (error) {
      toast.error({
        title: ACTION_FAILED,
        message: GENERATE_INVITE_MAIL_FAILED,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <Heading as="h3">Generate Invite Mail</Heading>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1">
          <Text className="text-lg">Candidate's CV</Text>
          <Text className="text-sm text-gray-500">
            Upload the CV of the candidate who passed the interview.
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

      <div className="flex justify-center items-center">
        <Button
          appearance="primary"
          className="w-[500px]"
          disabled={isLoading}
          loading={isLoading}
          type="button"
          onClick={generateInviteMail}
        >
          Generate invite mail
        </Button>
      </div>
      <div className="w-full">
        <Text className="text-lg">
          Get Candidate Info & Generate Invite Mail Result:
        </Text>
        <pre className="italic text-sm text-gray-500 whitespace-pre-wrap break-words">
          {generateInviteMailResult}
        </pre>
      </div>
    </Layout>
  )
}

export default GenerateInviteMailPage
