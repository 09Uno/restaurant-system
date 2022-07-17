import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { redirect } from 'next/dist/server/api-utils';
import { AuthError } from '../service/errors/AuthError';

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookie = parseCookies(ctx);

        const token = cookie['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try{
            return await fn(ctx);
        }catch(err ){
            if(err instanceof AuthError){
                destroyCookie(ctx, '@nextauth.token');

                return{
                    redirect:{
                        destination:'/',
                        permanent: false
                    }
                }
            }
        }

    }
}