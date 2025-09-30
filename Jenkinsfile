pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        NEW_RELIC_LICENSE_KEY = credentials('newrelic-license')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

       stage('Install Dependencies') {
    steps {
        echo 'Installing npm dependencies including devDependencies'
        bat 'npm ci --include=dev'
    }
}


        stage('Build') {
            steps {
                echo 'Building and creating artifact (ZIP)'
                bat '''
                REM Create build folder if it doesn't exist
                if not exist build mkdir build
                REM Copy necessary files
                xcopy package.json build /Y
                if exist index.js xcopy index.js build /Y
                if exist src xcopy src build /E /I /Y
                if exist tests xcopy tests build /E /I /Y
                if exist Jenkinsfile xcopy Jenkinsfile build /Y
                REM Compress build folder into an artifact zip
                powershell -Command "Compress-Archive -Path build\\* -DestinationPath build\\artifact.zip -Force"
                '''
                archiveArtifacts artifacts: 'build/artifact.zip', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests'
                bat 'npx jest'
            }
        }

        stage('Code Quality') {
    steps {
        echo 'Running code quality analysis'
    }
}

        stage('Security') {
            steps {
                echo 'Running security checks'
                bat 'npm audit --audit-level=low'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application with Docker'
                bat '''
                docker build -t jenkins-node-demo:latest .
                docker stop jenkins-node-demo || exit 0
                docker rm jenkins-node-demo || exit 0
                docker run -d -p 3000:3000 --name jenkins-node-demo jenkins-node-demo:latest
                '''
            }
        }

        stage('Release') {
    steps {
        echo 'Releasing to production...'
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                                          usernameVariable: 'DOCKER_USER', 
                                          passwordVariable: 'DOCKER_PASS')]) {
            bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
            bat 'docker tag jenkins-node-demo andrespulido/jenkins-node-demo:latest'
            bat 'docker push andrespulido/jenkins-node-demo:latest'
        }
        echo 'Production release complete'
    }
}


    }

    post {
        always { echo 'Pipeline finished' }
    }
}
