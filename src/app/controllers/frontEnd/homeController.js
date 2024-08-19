const nodemailer = require("nodemailer")

class ProductController {
  hompePage = async (req, res) => {
    let output = req.body.output ? JSON.parse(req.body.output) : []
    try {
      if (req.method == "POST" && output) {
        const email = process.env.EMAIL_CONFIG;
        console.log(process.env.EMAIL_CONFIG)
        console.log(process.env.EMAIL_PASS)
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          service: 'gmail',
          secure: true,
          auth: {
            user: email,
            pass: process.env.EMAIL_PASS,
          },
        })
        

        output.forEach(async (item, index) => {
            item.total1 = Number(item.payment_fee1 - item.discount1);
            item.total2 = Number(item.payment_fee2 - item.discount2);
            item.total3 = Number(item.payment_fee3 - item.discount3);
          item.total1 = item.total1.toLocaleString("vi");
          item.total2 = item.total2.toLocaleString("vi");
          item.total3 = item.total3.toLocaleString("vi");
          item.payment_fee1 = item.payment_fee1.toLocaleString("vi");
          item.payment_fee2 = item.payment_fee2.toLocaleString("vi");
          item.payment_fee3 = item.payment_fee3.toLocaleString("vi");
          item.discount1 = item.discount1.toLocaleString("vi");
          item.discount2 = item.discount2.toLocaleString("vi");
          item.discount3 = item.discount3.toLocaleString("vi");

        try {
            await transporter.sendMail({
                from: `"${process.env.NAME}" <${email}>`, // sender address
                to: item.email, // list of receivers
                subject: `CHỨNG THƯ SỐ ĐẾN KỲ GIA HẠN LẠI !`, // Subject line
                html: `
              <div dir="ltr">
                <p
                    align="center"
                    style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    <b style="font-family:calibri,sans-serif">
                    <span style="font-family:&quot;times new roman&quot;,serif;color:rgb(74,69,42)">V/v: Hết hạn hợp đồng ${item.network}</span>
                    </b>
                </p>
                <p style="margin:0cm 0cm 8pt;line-height:16.7919px">
                    <u>
                    <span style="font-family:times new roman,serif;font-size:12pt;line-height:18.3184px">Kính gửi:</span>
                    <span style="font-size:12pt;line-height:18.3184px">
                        <font
                        face="Roboto, RobotoDraft, Helvetica, Arial, sans-serif"
                        style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgb(0,0,0)"
                        >
                        </font>
                    </span>
                    </u>
                    <span style="font-family:Calibri,Arial;font-size:14pt;">
                    ${item.company}
                    </span>
                </p>
                <p style="margin:0cm 0cm 8pt;line-height:16.7919px">
                    <span style="font-family:Calibri,Arial;font-size:11pt;text-align:right;color:rgb(0,0,0)">MST :</span>
                    <span
                    style="font-family:Calibri,Arial;font-size:14pt;text-align:right;"
                    >${item.tax}</span>
                </p>
                <p
                    style="margin:0cm 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    <span style="font-family:times new roman,serif">Về việc Gia hạn thời hạn chứng thư số của Quý
                    khách với thông tin như sau:</span>
                </p>
                <p
                    style="margin:0cm 0cm 10pt 47.25pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    <span style="font-size:10pt;font-family:symbol;color:rgb(89,89,89)">·</span>
                    <span style="font-size:7pt;font-family:times new roman,serif;color:rgb(89,89,89)"></span>
                    <span style="font-family:&quot;times new roman&quot;,serif;color:rgb(89,89,89)">
                    <span style="font-family:&quot;times new roman&quot;,serif">Chứng thư có hạn đến
                        ${item.end_date}
                        đến chu kỳ gia hạn lại .
                    </span>
                    </span>
                </p>
                <p
                    style="margin:0cm 0cm 10pt 47.25pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    <span style="font-family:times new roman,serif;color:rgb(89,89,89)">Để đảm bảo trong quá trình
                    kí gửi văn bản điện tử diễn ra liên tục, không bị ngắt quãng đường truyền trong kỳ BCTC. Tránh
                    trường hợp khóa thiết bị Phòng QLCL ${item.network} rất mong Quý đơn vị khi nhận được thông báo chủ
                    động liên hệ với bộ phận hỗ trợ để được hướng dẫn thủ tục cập nhật thời hạn mới.</span>
                </p>
                <br />
                <br />
                <br />
                <p
                    style="margin:0cm 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    Bảng giá gia hạn dịch vụ :
                </p>
                <br />
                <table
                    width="101%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="width:647.657px;font-family:sans-serif;background-image:none;border-collapse:collapse;table-layout:auto;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    <tbody style="font-family:sans-serif">
                    <tr style="height:27.9pt;font-family:sans-serif">
                        <td
                        width="166"
                        valign="top"
                        nowrap=""
                        style="width:124.15pt;border:1pt solid black;padding:0cm 5.4pt;height:27.9pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Tên gói dịch vụ</span>
                            </b>
                        </p>
                        </td>
                        <td
                        colspan="3"
                        width="482"
                        valign="top"
                        nowrap=""
                        style="width:361.45pt;border-style:solid solid solid none;border-width:1pt 1pt 1pt medium;padding:0cm 5.4pt;height:27.9pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:0cm 0cm 0.0001pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">${item.network}</span>
                            </b>
                        </p>
                        </td>
                    </tr>
                    <tr style="height:23.4pt;font-family:sans-serif">
                        <td
                        width="166"
                        valign="top"
                        style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Thời gian sửdụng</span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">1 Năm</span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">2Năm</span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <span
                            style="font-size:12pt;font-family:times new roman,serif;color:rgb(31,73,125)"
                            ></span>
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">3 Năm</span>
                            </b>
                        </p>
                        </td>
                    </tr>
                    <tr style="height:35.1pt;font-family:sans-serif">
                        <td
                        width="166"
                        valign="top"
                        nowrap=""
                        style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-family:times new roman,serif">Phí thanh toán</span>
                            </i>
                            </b>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        nowrap=""
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span
                                style="font-family:times new roman,serif;color:rgb(68,114,196)"
                                >${item.payment_fee1}</span>
                            </i>
                            </b>
                            <span style="font-family:calibri,sans-serif;color:rgb(68,114,196)">
                            </span>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        nowrap=""
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-family:times new roman,serif">${item.payment_fee2}</span>
                            </i>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        nowrap=""
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-family:times new roman,serif">${item.payment_fee3}</span>
                            </i>
                            </b>
                        </p>
                        </td>
                    </tr>
                    <tr style="height:24.15pt;font-family:sans-serif">
                        <td
                        width="166"
                        valign="top"
                        style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt 5.4pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Chiết khấu</span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount1}</span>
                            </i>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount2}</span>
                            </i>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <i style="font-family:calibri,sans-serif">
                                <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount3}</span>
                            </i>
                            </b>
                        </p>
                        </td>
                    </tr>
                    <tr style="height:33.15pt;font-family:sans-serif">
                        <td
                        width="166"
                        valign="top"
                        style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:red">Tổng thanh toán</span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:sans-serif"
                        >
                            <font
                            face="times new roman, serif"
                            style="font-family:times new roman,serif;color:rgb(255,0,0)"
                            >
                            <b style="font-family:times new roman,serif">${item.total1}</b>
                            </font>
                        </p>
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:red"></span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="164"
                        valign="top"
                        style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:sans-serif"
                        >
                            <font
                            face="times new roman, serif"
                            style="font-family:times new roman,serif;color:rgb(255,0,0)"
                            >
                            <b style="font-family:times new roman,serif">${item.total2}</b>
                            </font>
                        </p>
                        <p
                            align="center"
                            style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:red"></span>
                            </b>
                        </p>
                        </td>
                        <td
                        width="153"
                        valign="top"
                        style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                        >
                        <p
                            align="center"
                            style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:calibri,sans-serif"
                        >
                            <b style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif;color:red">${item.total3}</span>
                            </b>
                        </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p
                    style="margin:7.5pt 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                    Thủ tục gia hạn : Quý công ty lựa chọn gói cước gia hạn, sau đó liên hệ nhân viên Phòng Kinh
                    doanh để tiến hành thủ tục gia hạn theo số điện thoại
                    <b style="font-family:calibri,sans-serif">
                    <span style="font-size:14pt;font-family:times new roman,serif;color:rgb(0,112,192)">: 0901 197
                        180 Mrs ${process.env.NAME.toUpperCase()}</span>
                    hoặc gửi lại email thông báo gia hạn có kèm thông tin của người liên hệ
                    </b>
                </p>
                    <br />
                    <br />
                <div dir="auto" style="font-family:sans-serif;font-size:12.8px">
                    <img
                    src="${process.env.URL_IMAGE}${item.network.toUpperCase()}.png"
                    alt="vt.png"
                    style="width:338px;max-width:100%"
                    data-image-whitelisted=""
                    class="CToWUd"
                    data-bit="iit"
                    />
                    <br />
                </div>
                <p
                    style="margin:0cm 0cm 0.0001pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
                >
                </p>
                <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >
                    <span style="width:253.5pt;height:98.25pt;font-family:arial,sans-serif">
                    </span>
                    </span>
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >
                    </span>
                </p>
                <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >Trân trọng !</span>
                </p>
                <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
                </p>
                <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >PHÒNG CHỨNG THỰC GIAO DỊCH ĐIỆN TỬ</span>
                </p>
                <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >SĐT : ${process.env.PHONE}</span>
                </p>
                <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                    <span
                    style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                    >EMAIL:</span>
                    <span
                    style="font-family:arial,sans-serif;background-image:none;background-position:0% 0%;background-repeat:repeat repeat"
                    >
                    <font style="font-family:arial,sans-serif;color:rgb(17,85,204)">
                        <a
                        href="mailto:${email}"
                        style="font-family:arial,sans-serif"
                        target="_blank"
                        >${email}</a>
                    </font>
                    </span>
                </p>
                </div>`, // html body
              })
            await new Promise(resolve => setTimeout(resolve, 500));  // Chờ 1 giây trước khi gửi email tiếp theo
        } catch (error) {
            console.log(error);
            return false;
        }
        })
      }
      return res.render("home", { layout: "main" })
    } catch (err) {
      console.log(err)
      
      return res.status(404).send({ success: false, message: "Thông tin không đúng, bạn vui lòng liên hệ sdt: 0397973603" })
    }
  }
  sendMail = async (req, res) => {
    let output = req.body 
    try {
      if (req.method == "POST" && output) {
        const email = process.env.EMAIL_CONFIG;
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          service: 'gmail',
          secure: true,
          auth: {
            user: email,
            pass: process.env.EMAIL_PASS,
          },
        })
        let item = output;
        item.total1 = Number(item.payment_fee1 - item.discount1);
        item.total2 = Number(item.payment_fee2 - item.discount2);
        item.total3 = Number(item.payment_fee3 - item.discount3);
      item.total1 = item.total1.toLocaleString("vi");
      item.total2 = item.total2.toLocaleString("vi");
      item.total3 = item.total3.toLocaleString("vi");
      item.payment_fee1 = item.payment_fee1.toLocaleString("vi");
      item.payment_fee2 = item.payment_fee2.toLocaleString("vi");
      item.payment_fee3 = item.payment_fee3.toLocaleString("vi");
      item.discount1 = item.discount1.toLocaleString("vi");
      item.discount2 = item.discount2.toLocaleString("vi");
      item.discount3 = item.discount3.toLocaleString("vi");
        await transporter.sendMail({
            from: `"${process.env.NAME}" <${email}>`, // sender address
            to: item.email, // list of receivers
            subject: `CHỨNG THƯ SỐ ĐẾN KỲ GIA HẠN LẠI !`, // Subject line
            html: `
          <div dir="ltr">
            <p
                align="center"
                style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                <b style="font-family:calibri,sans-serif">
                <span style="font-family:&quot;times new roman&quot;,serif;color:rgb(74,69,42)">V/v: Hết hạn hợp đồng ${item.network}</span>
                </b>
            </p>
            <p style="margin:0cm 0cm 8pt;line-height:16.7919px">
                <u>
                <span style="font-family:times new roman,serif;font-size:12pt;line-height:18.3184px">Kính gửi:</span>
                <span style="font-size:12pt;line-height:18.3184px">
                    <font
                    face="Roboto, RobotoDraft, Helvetica, Arial, sans-serif"
                    style="font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgb(0,0,0)"
                    >
                    </font>
                </span>
                </u>
                <span style="font-family:Calibri,Arial;font-size:14pt;">
                ${item.company}
                </span>
            </p>
            <p style="margin:0cm 0cm 8pt;line-height:16.7919px">
                <span style="font-family:Calibri,Arial;font-size:11pt;text-align:right;color:rgb(0,0,0)">MST :</span>
                <span
                style="font-family:Calibri,Arial;font-size:14pt;text-align:right;"
                >${item.tax}</span>
            </p>
            <p
                style="margin:0cm 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                <span style="font-family:times new roman,serif">Về việc Gia hạn thời hạn chứng thư số của Quý
                khách với thông tin như sau:</span>
            </p>
            <p
                style="margin:0cm 0cm 10pt 47.25pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                <span style="font-size:10pt;font-family:symbol;color:rgb(89,89,89)">·</span>
                <span style="font-size:7pt;font-family:times new roman,serif;color:rgb(89,89,89)"></span>
                <span style="font-family:&quot;times new roman&quot;,serif;color:rgb(89,89,89)">
                <span style="font-family:&quot;times new roman&quot;,serif">Chứng thư có hạn đến
                    ${item.end_date}
                    đến chu kỳ gia hạn lại .
                </span>
                </span>
            </p>
            <p
                style="margin:0cm 0cm 10pt 47.25pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                <span style="font-family:times new roman,serif;color:rgb(89,89,89)">Để đảm bảo trong quá trình
                kí gửi văn bản điện tử diễn ra liên tục, không bị ngắt quãng đường truyền trong kỳ BCTC. Tránh
                trường hợp khóa thiết bị Phòng QLCL ${item.network} rất mong Quý đơn vị khi nhận được thông báo chủ
                động liên hệ với bộ phận hỗ trợ để được hướng dẫn thủ tục cập nhật thời hạn mới.</span>
            </p>
            <br />
            <br />
            <br />
            <p
                style="margin:0cm 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                Bảng giá gia hạn dịch vụ :
            </p>
            <br />
            <table
                width="101%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="width:647.657px;font-family:sans-serif;background-image:none;border-collapse:collapse;table-layout:auto;background-position:0% 0%;background-repeat:repeat repeat"
            >
                <tbody style="font-family:sans-serif">
                <tr style="height:27.9pt;font-family:sans-serif">
                    <td
                    width="166"
                    valign="top"
                    nowrap=""
                    style="width:124.15pt;border:1pt solid black;padding:0cm 5.4pt;height:27.9pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Tên gói dịch vụ</span>
                        </b>
                    </p>
                    </td>
                    <td
                    colspan="3"
                    width="482"
                    valign="top"
                    nowrap=""
                    style="width:361.45pt;border-style:solid solid solid none;border-width:1pt 1pt 1pt medium;padding:0cm 5.4pt;height:27.9pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:0cm 0cm 0.0001pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">${item.network}</span>
                        </b>
                    </p>
                    </td>
                </tr>
                <tr style="height:23.4pt;font-family:sans-serif">
                    <td
                    width="166"
                    valign="top"
                    style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Thời gian sửdụng</span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">1 Năm</span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">2Năm</span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:23.4pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <span
                        style="font-size:12pt;font-family:times new roman,serif;color:rgb(31,73,125)"
                        ></span>
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">3 Năm</span>
                        </b>
                    </p>
                    </td>
                </tr>
                <tr style="height:35.1pt;font-family:sans-serif">
                    <td
                    width="166"
                    valign="top"
                    nowrap=""
                    style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif">Phí thanh toán</span>
                        </i>
                        </b>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    nowrap=""
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span
                            style="font-family:times new roman,serif;color:rgb(68,114,196)"
                            >${item.payment_fee1}</span>
                        </i>
                        </b>
                        <span style="font-family:calibri,sans-serif;color:rgb(68,114,196)">
                        </span>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    nowrap=""
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif">${item.payment_fee2}</span>
                        </i>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    nowrap=""
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:35.1pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-family:times new roman,serif">${item.payment_fee3}</span>
                        </i>
                        </b>
                    </p>
                    </td>
                </tr>
                <tr style="height:24.15pt;font-family:sans-serif">
                    <td
                    width="166"
                    valign="top"
                    style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt 5.4pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:rgb(31,73,125)">Chiết khấu</span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount1}</span>
                        </i>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount2}</span>
                        </i>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:24.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <i style="font-family:calibri,sans-serif">
                            <span style="font-size:12pt;font-family:times new roman,serif;color:rgb(68,114,196)">${item.discount3}</span>
                        </i>
                        </b>
                    </p>
                    </td>
                </tr>
                <tr style="height:33.15pt;font-family:sans-serif">
                    <td
                    width="166"
                    valign="top"
                    style="width:124.15pt;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:red">Tổng thanh toán</span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:sans-serif"
                    >
                        <font
                        face="times new roman, serif"
                        style="font-family:times new roman,serif;color:rgb(255,0,0)"
                        >
                        <b style="font-family:times new roman,serif">${item.total1}</b>
                        </font>
                    </p>
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:red"></span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="164"
                    valign="top"
                    style="width:123.2pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:sans-serif"
                    >
                        <font
                        face="times new roman, serif"
                        style="font-family:times new roman,serif;color:rgb(255,0,0)"
                        >
                        <b style="font-family:times new roman,serif">${item.total2}</b>
                        </font>
                    </p>
                    <p
                        align="center"
                        style="margin:7.5pt 0cm 10pt;text-align:center;line-height:normal;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:red"></span>
                        </b>
                    </p>
                    </td>
                    <td
                    width="153"
                    valign="top"
                    style="width:115.1pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0cm 5.4pt;height:33.15pt;font-family:sans-serif"
                    >
                    <p
                        align="center"
                        style="margin:0cm 0cm 10pt;text-align:center;line-height:12.65pt;font-size:11pt;font-family:calibri,sans-serif"
                    >
                        <b style="font-family:calibri,sans-serif">
                        <span style="font-family:times new roman,serif;color:red">${item.total3}</span>
                        </b>
                    </p>
                    </td>
                </tr>
                </tbody>
            </table>
            <p
                style="margin:7.5pt 0cm 10pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
                Thủ tục gia hạn : Quý công ty lựa chọn gói cước gia hạn, sau đó liên hệ nhân viên Phòng Kinh
                doanh để tiến hành thủ tục gia hạn theo số điện thoại
                <b style="font-family:calibri,sans-serif">
                <span style="font-size:14pt;font-family:times new roman,serif;color:rgb(0,112,192)">: 0901 197
                    180 Mrs ${process.env.NAME.toUpperCase()}</span>
                hoặc gửi lại email thông báo gia hạn có kèm thông tin của người liên hệ
                </b>
            </p>
                <br />
                <br />
            <div dir="auto" style="font-family:sans-serif;font-size:12.8px">
                <img
                src="${process.env.URL_IMAGE}${item.network.toUpperCase()}.png"
                alt="vt.png"
                style="width:338px;max-width:100%"
                data-image-whitelisted=""
                class="CToWUd"
                data-bit="iit"
                />
                <br />
            </div>
            <p
                style="margin:0cm 0cm 0.0001pt;line-height:normal;background-image:none;font-size:11pt;font-family:calibri,sans-serif;background-position:0% 0%;background-repeat:repeat repeat"
            >
            </p>
            <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >
                <span style="width:253.5pt;height:98.25pt;font-family:arial,sans-serif">
                </span>
                </span>
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >
                </span>
            </p>
            <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >Trân trọng !</span>
            </p>
            <p style="line-height:16.6349px;margin:0cm 0cm 8pt;font-size:11pt;font-family:calibri,sans-serif">
            </p>
            <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >PHÒNG CHỨNG THỰC GIAO DỊCH ĐIỆN TỬ</span>
            </p>
            <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >SĐT : ${process.env.PHONE}</span>
            </p>
            <p style="margin:0cm 0cm 8pt;line-height:16.7919px;font-size:11pt;font-family:calibri,sans-serif">
                <span
                style="font-family:arial,sans-serif;background-image:none;color:rgb(136,136,136);background-position:0% 0%;background-repeat:repeat repeat"
                >EMAIL:</span>
                <span
                style="font-family:arial,sans-serif;background-image:none;background-position:0% 0%;background-repeat:repeat repeat"
                >
                <font style="font-family:arial,sans-serif;color:rgb(17,85,204)">
                    <a
                    href="mailto:${email}"
                    style="font-family:arial,sans-serif"
                    target="_blank"
                    >${email}</a>
                </font>
                </span>
            </p>
            </div>`, // html body
          })
      }
      return res.json({message: 'send email successfully'});
    } catch (err) {
      console.log(err)
      
      return res.status(404).send({ success: false, message: "Thông tin không đúng, bạn vui lòng liên hệ sdt: 0397973603" })
    }
  }
}

module.exports = new ProductController()
