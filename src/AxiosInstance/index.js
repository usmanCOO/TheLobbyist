import adminAxiosInstance from './Axios';

export const LoginUser = async (adminEmail, adminPassword) => {
    console.log(adminEmail, adminPassword);
    try {
        let data = await adminAxiosInstance.post('/auth/login', {
            email: adminEmail,
            password: adminPassword
        });
        console.log('data is ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const forgotPasswordAdmin = async (adminEmail) => {
    try {
        let data = await adminAxiosInstance.post('/auth/forget-password', {
            email: adminEmail
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllQuestions = async () => {
    try {
        let res = await adminAxiosInstance.get('/question/get_questions');
        return res;
    } catch (error) {
        console.log('error in getting all questions');

        throw error;
    }
};

export const deleteQuestion = async (id) => {
    try {
        let res = await adminAxiosInstance.delete(`/question/delete_question/${id}`);
        return res;
    } catch (error) {
        console.log('error in deleting question');
        throw error;
    }
};

export const AddQuestion = async (question, opt, funfact, imagePath, CorrectAnswer, uniqueId) => {
    try {
        let obj = {
            options: opt
        };

        let data = await adminAxiosInstance.post('/question/add_question', {
            statements: question,
            options: obj.options,
            fun_fact: funfact,
            answers: CorrectAnswer,
            code: uniqueId,
            images: imagePath
        });
        console.log('data is ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const uploadImages = async (images) => {
    console.log('images in  uploadImages', images);
    let res;
    try {
        res = await adminAxiosInstance.post('/question/upload_card_images', images);
        console.log('API Res', res);
    } catch (error) {
        console.log('error', error.message);
    }
    return res ? res : '';
};

export const EditQuestion = async (question, optionData, CorrectAnswer, funfact, code, uniqueId, images) => {
    console.log('formData  is in edited  api index ', uniqueId, question, CorrectAnswer, funfact, code, images, optionData);
    try {
        let obj = {
            options: optionData
        };
        let data = await adminAxiosInstance.put(`/question/edit_question/${uniqueId}`, {
            statements: question,
            options: obj,
            fun_fact: funfact,
            answers: CorrectAnswer,
            code: code,
            images: images
        });
        console.log('data is ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const verifyotpAdmin = async (verifyotp) => {
    try {
        let data = await adminAxiosInstance.post('/auth/updatepassword', {
            verificationToken: verifyotp
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const resetPasswordAdmin = async (newpassword) => {
    try {
        let res = await adminAxiosInstance.post('/auth/reset-password', {
            password: newpassword
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const viewAllUsers = async () => {
    try {
        let res = await adminAxiosInstance.get('/admin/viewallusers');

        return res;
    } catch {
        console.log('view users');
        console.log(error);
        throw error;
    }
};

export const getRole = async (id) => {
    console.log('getting id: ', id);
    try {
        let res = await adminAxiosInstance.get(`auth/get_invite/${id}`);

        return res;
    } catch (error) {
        console.log('error in getting Role');

        throw error;
    }
};

export const signUp = async (email, role, firstName, password) => {
    console.log('getting id: ', email, role, firstName, password);
    try {
        let data = await adminAxiosInstance.post('/auth/sign-up', {
            email: email,
            role: role,
            fullName: firstName,
            password: password
        });
        console.log('data is for sign UP', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const sendInvite = async (email, roleAssigned) => {
    try {
        let data = await adminAxiosInstance.post('/admin/sendinvite', {
            email: email,
            roleAssigned: roleAssigned
        });
        console.log('data is ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatePasswordAdmin = async (newpassword, confirmpassword, verifyotp) => {
    try {
        let data = await adminAxiosInstance.post('/auth/updatepassword', {
            verificationToken: verifyotp,
            newpassword,
            confirmpassword
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createNewPack = async (packName, code, value, questionIds, mode) => {
    try {
        const str = value.toString();
        console.log('str', str);
        const integerArray = questionIds.map((str) => parseInt(str));
        console.log('questionIds', integerArray);
        let data = await adminAxiosInstance.post('/pack/create_pack', {
            pack_name: packName,
            pack_id: code,
            no_cards: str,
            metadata: ' ',
            questionIds: integerArray,
            mode: mode
        });
        return data;
        console.log('data is ', data);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPackList = async () => {
    try {
        let res = await adminAxiosInstance.get('/pack/get_packs');
        return res;
    } catch (error) {
        console.log('error in getting Pack List');

        throw error;
    }
};

export const deletePack = async (id) => {
    console.log('getting id: ', id);
    try {
        let res = await adminAxiosInstance.delete(`/pack/delete_pack/${id}`);
        return res;
    } catch (error) {
        console.log('error in deleting Pack');
        throw error;
    }
};

export const EditPack = async (id, names, pack_id, cards, questionId, mode) => {
    console.log('get id edit pack: ', id);
    console.log('data', names, id, cards, pack_id, questionId);
    const card = JSON.stringify(cards);
    try {
        let data = await adminAxiosInstance.put(`/pack/edit_packs/${id}`, {
            pack_name: names,
            pack_id: pack_id,
            no_cards: card,
            metadata: '',
            questionIds: questionId,
            mode: mode
        });
        console.log('data for the pack edit ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getQuestionAnalytics = async (id) => {
    try {
        let res = await adminAxiosInstance.get(`/question_analytics/get_record/${id}`);
        return res;
    } catch (error) {
        console.log('error in getting Question Analytics Record');
        throw error;
    }
};

export const getQuestionLogs = async (id) => {
    try {
        let res = await adminAxiosInstance.get(`question/get_question_logs/${id}`);
        return res;
    } catch (error) {
        console.log('error in getting Question Logs ');
        throw error;
    }
};

export const UpdateProfile = async (formData) => {
    try {
        let data = await adminAxiosInstance.put('auth/update_profile', formData);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getPackAnalytics = async (id) => {
    try {
        let res = await adminAxiosInstance.get(`pack_analytics/get_record/${id}`);
        return res;
    } catch (error) {
        console.log('error in getting Question Analytics Record');
        throw error;
    }
};

export const publishPack = async (packName) => {
    try {
        let data = await adminAxiosInstance.post(`/pack/publish?pack_name=${packName}`);
        return data;
    } catch (error) {
        console.log('error in publish Pack :', error);
        throw error;
    }
};
export const getRoundTime = async () => {
    try {
        let res = await adminAxiosInstance.get('/time/getroundtime');
        return res;
    } catch (error) {
        console.log('error in getting time');
        throw error;
    }
};

export const WinningCriteria = async () => {
    try {
        let data = await adminAxiosInstance.post('/admin/updatewinningcriteria', {
            /* data to be send */
        });
        return data;
    } catch (error) {
        console.log('error in Updating Winning Criteria:', error);
        throw error;
    }
};

export const getWinnigVotes = async () => {
    try {
        let res = await adminAxiosInstance.get('/votes/getWinningCriteria');
        return res;
    } catch (error) {
        console.log('error in getting Votes');
        throw error;
    }
};

export const updateVotes = async (id, votes) => {
    console.log('get id edit votes: ', id);
    console.log('data', id, votes);

    try {
        let data = await adminAxiosInstance.put(`votes/changeWinningCriteria/${id}`, {
            changed_votes: votes
        });
        console.log('data for the Update votes ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateRoundTime = async (id, round_time) => {
    console.log('get round time id: ', id);

    try {
        let data = await adminAxiosInstance.put(`time/edit_roundtime/${id}`, {
            round_time: round_time
        });
        console.log('data for the round time ', data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPackQuestions = async (Id) => {
    console.log('get id edit pack: ', Id);
    try {
        let res = await adminAxiosInstance.get(`/pack/get_packsquestion/${Id}`);
        return res;
    } catch (error) {
        console.log('error in getting Pack Questions', error);
        throw error;
    }
};
export const getUserDetails = async (Id) => {
    console.log('get user Id: ', Id);
    try {
        let res = await adminAxiosInstance.get(`/auth/get_userDetails/${Id}`);
        return res;
    } catch (error) {
        console.log('error in getting User Details', error);
        throw error;
    }
};

export const topQuestionPlayed = async () => {
    try {
        let res = await adminAxiosInstance.get('/dashboard/getQuestionPlayed');
        return res;
    } catch (error) {
        console.log('error in getting Top 5 Questions', error);
        throw error;
    }
};

export const topCardPlayed = async () => {
    try {
        let res = await adminAxiosInstance.get('/dashboard/getCardPlayed');
        return res;
    } catch (error) {
        console.log('error in getting Top 5 Cards', error);
        throw error;
    }
};

export const YearlyGames = async () => {
    try {
        let res = await adminAxiosInstance.get('/games/get_YearlyGames');
        return res;
    } catch (error) {
        console.log('error in getting Top Yearly games', error);
        throw error;
    }
};

export const gameDetails = async (interval) => {
    try {
        let res = await adminAxiosInstance.get(`/games/get_totalGames/${interval}`);
        return res;
    } catch (error) {
        console.log('error in getting  games', error);
        throw error;
    }
};
export const totalGame = async () => {
    try {
        let res = await adminAxiosInstance.get('/games/get_totalGames');
        return res;
    } catch (error) {
        console.log('error in getting Total games', error);
        throw error;
    }
};

export const archivePack = async (id) => {
    console.log('getting id: ', id);
    try {
        let res = await adminAxiosInstance.patch(`/pack/archive_Pack/${id}`);
        return res;
    } catch (error) {
        console.log('error in Archiving Pack');
        throw error;
    }
};

export const unArchivePack = async (id) => {
    console.log('getting id: ', id);
    try {
        let res = await adminAxiosInstance.patch(`/pack/unArchivePack/${id}`);
        return res;
    } catch (error) {
        console.log('error in UnArchiving Pack');
        throw error;
    }
};

export const deleteImage = async (id, qid) => {
    console.log('getting id in deleting Image: ', id, qid);
    try {
        let res = await adminAxiosInstance.delete(`/question/image_delete/${id}/${qid}`);
        return res;
    } catch (error) {
        console.log('error in deleting Image');
        throw error;
    }
};

export const s3ImageDelete = async (card_image) => {
    console.log('getting id in deleting Image: ', card_image);
    try {
        let res = await adminAxiosInstance.delete("/question/s3ImageDelete", {
            data: {
                card_image: card_image
            }
        });
        return res;
    } catch (error) {
        console.log('error in deleting Image');
        throw error;
    }
};

export const trainModel = async () => {
    try {
        console.log('in train model');
        let res = await fetch('https://admin.lobbyist.games/TrainModel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res;
    } catch (error) {
        console.log('error in trainModel');
        throw error;
    }
};
