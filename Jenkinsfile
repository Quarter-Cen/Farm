pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // ใช้ชื่อที่คุณตั้งไว้ใน Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm  // เช็คเอาท์โค้ดจาก Git repository
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // ติดตั้ง dependencies ที่จำเป็น
            }
        }
        stage('Run Unit Tests') {
            steps {
                script {
                    try {
                        sh 'npm test -- --coverage --ci'  // รัน Unit Tests ด้วย Jest
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'  // ถ้ามีข้อผิดพลาดในการทดสอบ
                        throw e  // ทำให้ pipeline หยุดทำงาน
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Some tests failed.'
        }
    }
}
