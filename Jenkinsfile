pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/goal-tracker"
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/your-username/goal-tracker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:${BUILD_NUMBER} .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker login -u your-dockerhub-username -p your-password'
                sh 'docker push $DOCKER_IMAGE:${BUILD_NUMBER}'
            }
        }
    }
}