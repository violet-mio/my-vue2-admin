import { genOptionList } from '@/utils/index'

export const genderLimitStatus = {
  UNLIMIT: 0,
  LIMIT: 1,
}

export const genderLimitStatusMap = {
  [genderLimitStatus.UNLIMIT]: '不限',
  [genderLimitStatus.LIMIT]: '限定',
}

export const genderLimitStatusOptions = genOptionList(genderLimitStatus, genderLimitStatusMap)


// 性别
export const sexStatus = {
  MALE: 1,
  FEMALE: 2,
}

export const sexStatusMap = {
  [sexStatus.MALE]: '男性',
  [sexStatus.FEMALE]: '女性'
}

export const sexStatusOptions = genOptionList(sexStatus, sexStatusMap)
