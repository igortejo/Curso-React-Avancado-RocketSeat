// Passo a passo para começar a criar um componente:
// 1- HTML
// 2- Estilização (css)
// 3- Parte funcional
import {format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { useState } from 'react';
import { ListDashes } from 'phosphor-react';



export function Post({author, publishedAt, content}) {

// estado = Variáveis que eu quero que o componente monitore
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!',
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix:true,
    })

    // Lidar quando o user clicar em submit
    function handleCreateNewComment() {
        event.preventDefault();

        // // Pega o novo valor digitado
        // const newCommentText = event.target.comment.value;

        // Esse "...comments" pega tudo que ja existia na variavel
        setComments([...comments, newCommentText]);

        // Deixa vazia textarea apos um inserção
        setNewCommentText('');


    }

    function handleNewCommentChange() {
        event.target.setCustomValidity(''); /*Para de exibir a mensagem de campo obrigatorio quanto eu digitar de fato algo */
       setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete) {
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
                    <Avatar hasBorder={true} src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
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