const SET_STORY = "SET_STORY"
const SET_STORIES = "SET_STORIES"
const SET_COMMENTS = "SET_COMMENTS"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_NEWS_TYPE = "TOGGLE_NEWS_TYPE"

const initialState = {
    storyData: {},
    storiesData: [],
    commentsData: [],
    subCommentsData: [],
    isFetching: false,
    newsType: true,
}

const storiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_STORY:
            return { ...state, storyData: { ...action.story } }
        case SET_STORIES:
            return { ...state, commentsData: [], storiesData: [...action.stories] }
        case SET_COMMENTS:
            if (action.parentType === 'comment') {
                const oldIds = state.subCommentsData.map(el => (el.id))
                const fltSubComments = []
                action.comments.forEach(el => {
                    if (!el.deleted) {
                        if (!oldIds.includes(el.id)) {
                            fltSubComments.push({ ...el })
                        }
                    }
                })
                fltSubComments.sort((a, b) => {
                    if (a.time > b.time) {
                        return 1;
                    }
                    if (a.time < b.time) {
                        return -1;
                    }
                    return 0;
                })
                return { ...state, subCommentsData: [...state.subCommentsData, ...fltSubComments] }
            }
            else {
                const fltComments = []
                action.comments.forEach(el => {
                    if (!el.deleted) {
                        fltComments.push({ ...el })
                    }
                })
                fltComments.sort((a, b) => {
                    if (a.time < b.time) {
                        return 1;
                    }
                    if (a.time > b.time) {
                        return -1;
                    }
                    return 0;
                })
                return { ...state, commentsData: [...fltComments] }
            }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_NEWS_TYPE:
            return { ...state, newsType: !state.newsType }
        default:
            return state
    }
}

export const setStoryAC = (story) => {
    return {
        type: SET_STORY,
        story: story,
    }
}

export const setStoriesAC = (stories) => {
    return {
        type: SET_STORIES,
        stories: stories,
    }
}

export const setCommentsAC = (comments, parentType) => {
    return {
        type: SET_COMMENTS,
        comments: comments,
        parentType: parentType
    }
}

export const toggleIsFetchingAC = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}

export const toggleNewsTypeAC = () => {
    return {
        type: TOGGLE_NEWS_TYPE
    }
}


export default storiesReducer