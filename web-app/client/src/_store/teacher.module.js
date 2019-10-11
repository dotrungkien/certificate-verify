import { teacherService } from '../_services/teacher.service';
import { router } from '../router';

const state = {
  listSubjects: [],
  studentsOfSubject: []
};

const actions = {
  async getAllSubjects({ dispatch, commit }) {
    let res = await teacherService.getAllSubjects();
    if (!res.success) {
      dispatch('alert/error', res.msg, { root: true });
      if ('403'.includes(res.msg)) {
        router.push('/403');
      }
    } else {
      dispatch('alert/clear', res.success, { root: true });
      commit('getAllSubjects', res.subjects);
    }
  },
  async getStudentsOfSubject({ dispatch, commit }, subjectId) {
    let res = await teacherService.getStudentsOfSubject(subjectId);
    if (!res.success) {
      dispatch('alert/error', res.msg, { root: true });
      if ('403'.includes(res.msg)) {
        router.push('/403');
      }
    } else {
      dispatch('alert/clear', res.success, { root: true });
      commit('getStudentsOfSubject', res.students);
    }
  },
  async setPointForStudent({ dispatch, commit }, { subjectId, username, point }) {
    let res = await teacherService.setPointForStudent(subjectId, username, point);
    if (!res.success) {
      dispatch('alert/error', res.msg, { root: true });
      if ('403'.includes(res.msg)) {
        router.push('/403');
      }
    } else {
      dispatch('alert/clear', res.success, { root: true });
      commit('setPointForStudent', res.students);
    }
  }
};

const mutations = {
  getAllSubjects(state, listSubjects) {
    state.listSubjects = listSubjects;
  },
  getStudentsOfSubject(state, studentsOfSubject) {
    state.studentsOfSubject = studentsOfSubject;
  },
  setPointForStudent(state, studentsOfSubject) {
    state.studentsOfSubject = studentsOfSubject;
  }
};

export const teacher = {
  namespaced: true,
  state,
  actions,
  mutations
};
