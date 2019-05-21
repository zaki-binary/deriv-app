const texts_json = {};
texts_json['VI'] = {"Real":"Thực","Investment":"Sự đầu tư","Gaming":"Chơi Game","Virtual":"Ảo","Bitcoin_Cash":"Bitcoin tiền mặt","Online":"Trực tuyến","Offline":"Ngoại tuyến","Connecting_to_server":"Đang kết nối với máy chủ","Day":"Ngày","Days":"Ngày","Target":"Mục tiêu","Barrier":"Giới hạn","Open_Positions":"Các Vị Trí Tuyển Dụng","Duration":"Khoảng thời gian","ticks":"tick","Entry_spot":"Điểm khởi đầu","Exit_spot":"Điểm chốt","Start_time":"Thời gian bắt đầu","Hour":"Giờ","Minute":"Phút","Deposit":"Gửi tiền","Log_in":"Đăng nhập","Sign_up":"Đăng kí","Contract_Details":"Chi tiết Hợp đồng","Portfolio":"Hồ sơ","Profit_Table":"Bảng lãi","Statement":"Sao Kê","Trade":"Giao dịch","Personal_Details":"Thông Tin Cá Nhân","Financial_Assessment":"Đánh Giá Tài Chính","Account_Password":"Mật Khẩu Tài Khoản","Cashier_Password":"Mật Khẩu Thu Ngân","Self_Exclusion":"Tự Loại trừ","Account_Limits":"Giới hạn Tài khoản","Login_History":"Lịch Sử Đăng Nhập","API_Token":"Mã API Token","Log_out":"Đăng xuất","No":"Không","Yes":"Có","OK":"Ok","Ends_Outside":"Kết Thúc Ra Ngoài","Ends_Between":"Kết Thúc Giữa","Stays_Between":"Nằm Giữa","Goes_Outside":"Ra Ngoài","Reset_Call":"Đặt lại Gọi Biên","Reset_Put":"Đặt lại Put","High_Tick":"Tick cao","Low_Tick":"Tick thấp","Asian_Up":"Châu á tăng","Asian_Down":"Châu Á Giảm","Close-Low":"Đóng-Thấp","High-Close":"Cao-Đóng","High-Low":"Cao-Thấp","Call_Spread":"Gọi biên","Put_Spread":"Đặt biên lãi","Only_Ups":"Chỉ Tăng","Only_Downs":"Chỉ Giảm","Higher":"Cao Hơn","Lower":"Thấp hơn","Jan":"Tháng Một","Feb":"Tháng Hai","Mar":"Tháng Ba","Apr":"Tháng 4","May":"Tháng Năm","Jun":"Tháng Sáu","Jul":"Tháng Bảy","Aug":"Tháng 8","Sep":"Tháng Chín","Oct":"Tháng Mười","Nov":"Tháng Mười Một","Dec":"Tháng 12","Monday":"Thứ Hai","Tuesday":"Thứ Ba","Wednesday":"Thứ Tư","Thursday":"Thứ Năm","Friday":"Thứ Sáu","Saturday":"Thứ Bảy","Sunday":"Chủ nhật","Contract_Information":"Thông tin của Hợp đồng","Profit/Loss":"Lợi Nhuận/Thua Lỗ","Purchase_Price":"Giá Mua","Remaining_Time":"Thời gian còn lại","Contract_will_be_sold_at_the_prevailing_market_price_when_the_request_is_received_by_our_servers__This_price_may_differ_from_the_indicated_price_":"Hợp đồng sẽ được bán ở giá thị trường hiện hành khi máy chủ nhận được yêu cầu. Giá này có thể khác với giá đã được chỉ định.","Sell":"Bán","Your_transaction_reference_number_is_[_1]":"Số tham chiếu giao dịch của bạn là [_1]","Close":"Đóng","The_page_you_requested_could_not_be_found__Either_it_no_longer_exists_or_the_address_is_wrong__Please_check_for_any_typos_":"Không tìm thấy trang bạn yêu cầu. Nó hoặc không còn tồn tại hoặc địa chỉ bị sai. Xin vui lòng kiểm tra lỗi chính tả.","Resale_not_offered":"Không được bán lại","Total":"Tổng","Contract_Type":"Loại hợp đồng","Potential_Payout":"Khoảng Được Trả Tiềm Năng","Purchase":"Mua","Indicative":"Chỉ thị","Transaction":"Giao dịch","Credit/Debit":"Tín dụng/Ghi nợ","Balance":"Số Dư Tài Khoản","Buy_price":"Giá mua","Open_positions":"Tuyển Dụng","Your_account_has_no_trading_activity_":"Không có hoạt động giao dịch nào trên tài khoản của bạn.","Trade_now":"Giao dịch ngay bây giờ","Date":"Ngày","Ref_":"Tham khảo.","Description":"Mô tả","Action":"Hành động","Allow_equals":"Cho phép bằng nhau","Win_payout_if_exit_spot_is_also_equal_to_entry_spot_":"Sẽ thắng nếu như điểm chốt bằng với điểm khởi đầu.","Last_Digit_Prediction":"Dự Đoán Chữ số Cuối Cùng","Now":"Hiện tại","Profile":"Tiểu sử","View_your_personal_information_":"Xem thông tin cá nhân của bạn.","Security_&_Limits":"Bảo mật & giới hạn","Change_your_main_login_password_":"Thay đổi mật khẩu đăng nhập chính của bạn.","Facility_that_allows_you_to_set_limits_on_your_account_":"Tiện ích cho phép bạn thiết lập giới hạn cho tài khoản của mình.","Limits":"Giới hạn","Set_Currency":"Thiết lập tiền tệ","Deposits_and_withdrawals_have_been_disabled_on_your_account__Please_check_your_email_for_more_details_":"Gửi tiền và rút tiền đã bị vô hiệu hoá trên tài khoản của bạn. Vui lòng kiểm tra email của bạn để biết chi tiết.","Withdrawals_have_been_disabled_on_your_account__Please_check_your_email_for_more_details_":"Rút tiền đã bị vô hiệu hoá trên tài khoản của bạn. Vui lòng kiểm tra email của bạn để biết chi tiết.","MT5_withdrawals_have_been_disabled_on_your_account__Please_check_your_email_for_more_details_":"Rút tiền MT5 đã bị vô hiệu hoá trên tài khoản của bạn. Vui lòng kiểm tra email của bạn để biết chi tiết.","Start_Time":"Thời gian bắt đầu","Entry_Spot":"Điểm khởi đầu","End_Time":"Thời Gian Kết Thúc","Exit_Spot":"Điểm chốt","Exit_Spot_Time":"Thời gian chốt","Payout":"Khoảng được trả","days":"ngày","day":"ngày","hours":"giờ","hour":"giờ","minutes":"phút","minute":"phút","seconds":"giây","Purchase_Time":"Thời Gian Mua","Stake":"Vốn đầu tư","Multiplier":"Số nhân","Rise/Fall":"Tăng/Giảm","Higher/Lower":"Cao Hơn/Thấp Hơn","Touch/No_Touch":"Chạm/Không Chạm","Ends_Between/Ends_Outside":"Kết Thúc Giữa / Kết Thúc Ra Ngoài","Stays_Between/Goes_Outside":"Nằm Giữa/ Ra Ngoài","Asians":"Châu Á","Matches/Differs":"Khớp/Khác nhau","Even/Odd":"Hòa vốn/ Số dư","Over/Under":"Trên/Dưới","Up/Down":"Lên/Xuống","In/Out":"Trong/Ngoài","Digits":"Chữ số","Trading_is_unavailable_at_this_time_":"Giao dịch không khả dụng tại thời điểm này.","Should_be_a_valid_number_":"Nên là một số hợp lệ.","Up_to_[_1]_decimal_places_are_allowed_":"Lên đến [_1] chữ số thập phân sau dấu phẩy được cho phép.","Should_be_[_1]":"Nên là [_1]","Should_be_between_[_1]_and_[_2]":"Nên ở giữa [_1] và [_2]","Should_be_more_than_[_1]":"Nên là nhiều hơn [_1]","Should_be_less_than_[_1]":"Nên là ít hơn [_1]","Only_letters,_numbers,_space,_and_these_special_characters_are_allowed:_[_1]":"Chỉ ký tự, số lượng, không gian, và các ký tự đặc biệt được phép: [_1]","The_two_passwords_that_you_entered_do_not_match_":"Hai mật khẩu bạn vừa nhập không khớp với nhau.","Invalid_email_address_":"Địa chỉ email không hợp lệ.","Only_letters,_numbers,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, số, khoảng trắng, dấu nối, dấu chấm, và dấu nháy đơn được cho phép.","You_should_enter_[_1]_characters_":"Bạn nên nhập vào [_1] ký tự.","Only_letters,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, khoảng trắng, dấu nối, dấu chấm hết và dấu nháy đơn được cho phép.","Minimum_of_[_1]_characters_required_":"Tối thiểu [_1] các kí tự cần thiết.","[_1]_and_[_2]_cannot_be_the_same_":"[_1] và [_2] không thể giống nhau.","Password_should_have_lower_and_uppercase_letters_with_numbers_":"Mật khẩu nên bao gồm cả chữ hoa, chữ thường và con số.","Only_letters,_numbers,_space,_and_hyphen_are_allowed_":"Chỉ các chữ cái, số, dấu cách và dấu nối là được phép.","Should_start_with_letter_or_number,_and_may_contain_hyphen_and_underscore_":"Nên bắt đầu bằng chữ hoặc số, và có thể chứa các gạch nối và gạch ngang dưới."};