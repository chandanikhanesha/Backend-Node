import * as moment from 'moment';
import { User } from '../../models';
import validator from './validator';

// create database current time
export const getDatabaseInsertableTime = (amount, unit) => {
    return moment(moment(), 'YYYY-MM-DD HH:mm:ss').add(amount, unit).toString();
};

// generate error message object
export const errorMessage = (path, message) => {
    return { path, message };
};

// generate success message object
export const response = (path, message, code, errors) => {
    return { path, message, code, errors };
};

// generate activation code
export const generateActivationCode = () =>
    ('00000000' + Math.floor(Math.random() * Math.pow(10, 6))).slice(-6);

// generate random password
export const generateRandomPassword = () => {
    const length = 10;
    const characters = 'abcdefghijklmnopqrstuvwxyz'; //to upper
    const capitalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeric = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]:?><,./-=';
    let password = '';
    let character = '';

    while (password.length < length) {
        const entity1 = Math.ceil(
            characters.length * Math.random() * Math.random()
        );
        const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        const entity3 = Math.ceil(
            punctuation.length * Math.random() * Math.random()
        );
        const entity4 = Math.ceil(
            capitalChars.length * Math.random() * Math.random()
        );
        let hold = characters.charAt(entity1);
        hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
        character += characters.charAt(entity1);
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        character += capitalChars.charAt(entity4);
        password = character;
    }

    password = password
        .split('')
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join('');

    return password.substr(0, length);
};

// get uuid by email
export async function getUUID(work_email) {
    let user = await User.findOne({ where: { work_email } });

    if (!user) {
        return false;
    }

    return user.uuid;
}

// generate random string
export const generateRandomString = (length) => {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// multi string replace
export const multiStringReplace = (object, string) => {
    let val = string;
    let entries = Object.entries(object);
    entries.forEach((para) => {
        let find = '{' + para[0] + '}';
        let regExp = new RegExp(find, 'g');
        val = val.replace(regExp, para[1]);
    });
    return val;
};

// validate form
export const validateForm = async (args, validationRule) => {
    let errors = null;
    await validator(args, validationRule, {}, (err, status) => {
        if (!status) {
            errors = err.errors;
        }
    });

    return {
        errors,
    };
};

export const getUserFullName = async (user) => {
    return user.first_name + ' ' + user.last_name;
};

export const pluck = async (array, field) => {
    if (array.length > 0) {
        return array.map((item) => item[field]);
    } else {
        return [];
    }
};

export const Paginator = async (items, pageNo, perSize) => {
    let page = pageNo || 1;
    let per_page = perSize || 10;
    let offset = (page - 1) * per_page;

    let paginatedItems = items.slice(offset).slice(0, per_page);
    let total_pages = Math.ceil(items.length / per_page);

    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
};