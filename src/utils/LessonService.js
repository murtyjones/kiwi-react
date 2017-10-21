import ApiFetch from './ApiFetch'
import config from 'config'

// TODO: This should move to an action+reducer! Make it look like the
// `getManyUserProjects` action.
export class LessonService {
    static async getLessons() {
    try {
      return await ApiFetch('http://localhost:8080/api/lesson')
    } catch (e) {
      console.error(`getLessons error: ${JSON.stringify(e)}`)
      throw new Error(e)
    }
	}
}
