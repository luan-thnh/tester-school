import unittest
import configparser

import HtmlTestRunner
import sys
import os

# Thêm đường dẫn đến thư mục gốc vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from pages.login_page import LoginPage
from utils.browser_setup import BrowserSetup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class LoginTest(unittest.TestCase):

    def setUp(self):
        # Đọc file config.ini
        config = configparser.ConfigParser()
        config.read('config.ini')

        # Lấy URL trang login từ file config
        self.login_url = config['app']['login_url']

        # Khởi tạo trình duyệt
        self.driver = BrowserSetup.get_driver()
        self.driver.get(self.login_url)  # Sử dụng URL từ file config

    def test_login_with_valid_credentials(self):
        # Test đăng nhập thành công
        self.login_page.enter_username("testuser")
        self.login_page.enter_password("password123")
        self.login_page.click_login()
        
        # Kiểm tra chuyển trang sau khi đăng nhập
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/")  # Chuyển đến trang chủ
        )
        self.assertIn("/", self.driver.current_url)


if __name__ == "__main__":
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='reports'))

