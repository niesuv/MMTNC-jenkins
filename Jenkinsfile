pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "niesuv/demojenkins:latest"
        DOCKER_CONTAINER_NAME = "demojenkinsapp"
        BRANCH_NAME = 'master'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Lấy mã nguồn từ GitHub
                checkout scm
            }
        }

        stage('Check Merge Request') {
            steps {
                script {
                    // Kiểm tra xem có phải là PR vào nhánh master không
                    if (env.GIT_BRANCH != "origin/${BRANCH_NAME}") {
                        error "This pipeline is only triggered for Merge Requests to the ${BRANCH_NAME} branch."
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Đảm bảo Dockerfile tồn tại trước khi build
                    sh '''
                         docker build -t $DOCKER_IMAGE_NAME .
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Đẩy Docker image lên Docker registry
                    withCredentials([usernamePassword(credentialsId: 'DockerHub_Credentails', 
                    passwordVariable: 'DOCKER_PASSWORD', 
                    usernameVariable: 'DOCKER_USERNAME')]) {
                        sh '''
                            echo $DOCKER_PASSWORD |  docker login --username $DOCKER_USERNAME --password-stdin
                             docker push $DOCKER_IMAGE_NAME
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy Docker container trên server
                    sh '''
                         docker pull $DOCKER_IMAGE_NAME
                         docker stop $DOCKER_CONTAINER_NAME || true
                         docker rm $DOCKER_CONTAINER_NAME || true
                         docker run -d -p 80:5173 --name $DOCKER_CONTAINER_NAME $DOCKER_IMAGE_NAME
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed!s"
        }
        success {
            echo "Pipeline succeeded!"
        }
    }
}
