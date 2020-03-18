import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import getDecodedData from './getDecodedData'
import { getPath } from '../getPath'

const getJsonData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection && accessToken) {
    const response = await getDecodedData(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      accessToken
    )

    return {
      sha: response.sha,
      fileRelativePath: filePath,
      data: JSON.parse(response.content),
    }
  } else {
    const absPath = getPath(filePath)
    console.log(`absPath ${absPath}`)
    const data = await readFile(absPath)
    return {
      fileRelativePath: filePath,
      data: JSON.parse(data),
    }
  }
}

export default getJsonData
