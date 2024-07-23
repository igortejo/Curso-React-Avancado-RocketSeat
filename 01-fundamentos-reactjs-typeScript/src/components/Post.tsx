// Passo a passo para começar a criar um componente:
// 1- HTML
// 2- Estilização (css)
// 3- Parte funcional
import {format, formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';


interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}


export function Post({ post }: PostProps) {

// estado = Variáveis que eu quero que o componente monitore
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!',
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix:true,
    })

    // Lidar quando o user clicar em submit
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        // // Pega o novo valor digitado
        // const newCommentText = event.target.comment.value;

        // Esse "...comments" pega tudo que ja existia na variavel
        setComments([...comments, newCommentText]);

        // Deixa vazia textarea apos um inserção
        setNewCommentText('');


    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity(''); /*Para de exibir a mensagem de campo obrigatorio quanto eu digitar de fato algo */
       setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
        // Seguindo o principio da imutabilidade do React, nos nao precisamos procurar
        // o comentario a ser deletado e depois deleta-lo, nós apenas criamos uma nova lista 
        // de comentarios e apenas sobrescrevemos a lista sem o comentario deletado

        // Nesse filter eu retorno apenas os comments diferentes do que eu quero deletar
        const commentsWithOutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete
        })

        setComments(commentsWithOutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if(line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                name='comment'
                placeholder='Deixe um comentário'
                value={newCommentText}
                onChange={handleNewCommentChange}
                onInvalid={handleNewCommentInvalid} /*funcao para mostrar o aviso de campo obrigatorio*/
                required={true} /*nao permite o usuario publicar um comentario vazio*/
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                             key={comment}
                             content={comment}
                             onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>

    )
}