type Error = {
    message: string;
    code: string;
};

export default function errorResolverFirebase(error: Error) {
    const emailAlreadyInUse = error.code.indexOf('email-already-in-use') !== -1;
    const wrongPassword = error.code.indexOf('wrong-password') !== -1;
    const userNotFound = error.code.indexOf('user-not-found') !== -1;
    if (emailAlreadyInUse) {
        return 'E-mail já cadastrado';
    }
    if (wrongPassword || userNotFound) {
        return 'E-mail ou senha incorreto';
    }
    return error;
}
