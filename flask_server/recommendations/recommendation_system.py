import pickle


class RecommendationSystem:
    def __init__(self):
        self.teachers = pickle.load(open('recommendations/teachers_df.pkl', 'rb'))
        self.skills = pickle.load(open('recommendations/skills_df.pkl', 'rb'))
        self.teacher_similarity = pickle.load(open('recommendations/teacher_similarity.pkl', 'rb'))
        self.skill_similarity = pickle.load(open('recommendations/skill_similarity.pkl', 'rb'))

    def recommend_skills(self, skill):
        index = self.skills[self.skills['skill'] == skill].index[0]
        distances = sorted(list(enumerate(self.skill_similarity[index])), reverse=True, key=lambda x: x[1])
        lst_skills = []
        for i in distances:
            if i[1] > 0.2:
                lst_skills.append(self.skills.iloc[i[0]].skill)
        return lst_skills

    def recommend_teacher(self, teacher_id, lst_skill, core_skill):
        idx = self.teacher_similarity[self.teacher_similarity.index != self.teacher_similarity][teacher_id].\
            sort_values(ascending=False)
        lst_idx = idx.index
        lst_val = idx.values
        lst_val = list(filter(lambda x: x >= 0.3, lst_val))
        lst_idx = lst_idx[:len(lst_val)]
        non_core_skill_cnt = 0
        similar_teachers = dict()
        for i in lst_idx:
            teacher_row = self.teachers[(self.teachers['teacher_id'] == i) & (self.teachers['skill'].isin(lst_skill))]
            if teacher_row['teacher_id'].count() > 0:
                teacher_id = teacher_row.values[0][0]
                skill = teacher_row.values[0][2]
                state = teacher_row.values[0][3]
                if skill != core_skill:
                    if non_core_skill_cnt < 2:
                        similar_teachers[teacher_id] = skill
                        non_core_skill_cnt += 1
                else:
                    similar_teachers[teacher_id] = skill
        return similar_teachers
